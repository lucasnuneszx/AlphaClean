import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Este endpoint recebe webhooks do Chatwoot
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event, conversation, contact, message } = body;

    console.log(`[Chatwoot Webhook] Event: ${event}`);

    // Exemplo: Se uma mensagem for criada pelo bot confirmando agendamento
    if (event === "message_created" && message?.content?.toLowerCase().includes("confirmado")) {
      // 1. Extrair dados da conversa
      const chatwootId = conversation.id.toString();
      const clientName = contact.name || "Cliente WhatsApp";
      const clientPhone = contact.phone_number || "";

      // 2. Criar ou Atualizar Cliente
      const client = await prisma.client.upsert({
        where: { phone: clientPhone },
        update: { name: clientName },
        create: { name: clientName, phone: clientPhone },
      });

      // 3. Criar Agendamento (JobOrder) automático
      // Aqui poderíamos usar IA para extrair Serviço e Veículo do texto, 
      // mas vamos criar um placeholder para o admin completar no Kanban.
      await prisma.jobOrder.create({
        data: {
          chatwoot_id: chatwootId,
          status: "SCHEDULED",
          scheduled_date: new Date(Date.now() + 86400000), // Placeholder para amanhã
          total_price: 0, // Admin define no sistema
          vehicle: {
            create: {
              client_id: client.id,
              brand: "Pendente",
              model: "Consultar Chat",
              category: "SEDAN", // Default
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

    // Se o status da conversa mudar no Chatwoot (ex: resolvido), podemos mover o Kanban para "COMPLETED"
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
