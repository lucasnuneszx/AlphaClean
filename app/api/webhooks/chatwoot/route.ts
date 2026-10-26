import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event, conversation, contact, message } = body;

    console.log(`[Chatwoot Webhook] Event: ${event}`);

    // Mensagem do bot contendo "confirmado" indica agendamento fechado no chat
    if (event === "message_created" && message?.content?.toLowerCase().includes("confirmado")) {
      const chatwootId = conversation.id.toString();
      const clientName = contact.name || "Cliente WhatsApp";
      const clientPhone = contact.phone_number || "";

      const client = await prisma.client.upsert({
        where: { phone: clientPhone },
        update: { name: clientName },
        create: { name: clientName, phone: clientPhone },
      });

      // Serviço e veículo não vêm estruturados no chat: a ordem é criada com
      // dados provisórios para o admin completar no Kanban.
      await prisma.jobOrder.create({
        data: {
          chatwoot_id: chatwootId,
          status: "SCHEDULED",
          scheduled_date: new Date(Date.now() + 86400000),
          total_price: 0,
          vehicle: {
            create: {
              client_id: client.id,
              brand: "Pendente",
              model: "Consultar Chat",
              category: "SEDAN",
            }
          },
          service: {
            connectOrCreate: {
              where: { id: "default_service" }, 
              create: { id: "default_service", name: "Lavagem Detalhada", base_price: 150, estimated_time_minutes: 120 }
            }
          }
        }
      });

      return NextResponse.json({ message: "Agendamento AlphaClean Sincronizado via Chatwoot" });
    }

    // Conversa resolvida no Chatwoot encerra a ordem no Kanban
    if (event === "conversation_status_changed" && body.status === "resolved") {
        await prisma.jobOrder.updateMany({
            where: { chatwoot_id: conversation.id.toString() },
            data: { status: "COMPLETED" }
        });
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("[Chatwoot Error]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
