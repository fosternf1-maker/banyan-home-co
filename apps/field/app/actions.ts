"use server";

import { refresh, revalidatePath } from "next/cache";
import { addServiceNote, getStore, setVisitStatus, toggleChecklistItem } from "@/lib/store";

export type NoteState = { error: string } | null;

function touch(visitId: string) {
  const visit = getStore().visits.find((entry) => entry.id === visitId);
  revalidatePath("/");
  revalidatePath("/homes");
  if (visit) {
    revalidatePath(`/visits/${visit.id}`);
    revalidatePath(`/homes/${visit.homeId}`);
    for (const equipmentId of visit.equipmentIds) {
      revalidatePath(`/homes/${visit.homeId}/equipment/${equipmentId}`);
    }
    if (visit.equipmentIds.length === 0) {
      revalidatePath(`/homes/${visit.homeId}`);
    }
  }
  refresh();
}

export async function toggleChecklist(visitId: string, itemId: string) {
  toggleChecklistItem(getStore(), visitId, itemId);
  touch(visitId);
}

export async function updateVisitStatus(visitId: string, status: string) {
  setVisitStatus(getStore(), visitId, status);
  touch(visitId);
}

export async function addNote(
  visitId: string,
  _prev: NoteState,
  formData: FormData,
): Promise<NoteState> {
  const equipmentId = String(formData.get("equipmentId") ?? "");
  const content = String(formData.get("content") ?? "");
  const error = addServiceNote(getStore(), visitId, equipmentId, content, new Date());
  if (error) return { error };
  const equipment = getStore().equipment.find((item) => item.id === equipmentId);
  if (equipment) {
    revalidatePath(`/homes/${equipment.homeId}/equipment/${equipment.id}`);
  }
  touch(visitId);
  return null;
}
