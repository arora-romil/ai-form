"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { forms } from "@/db/schema";
import { auth } from "@/auth";

export async function getUserForms() {
  const session = await auth();
  const userId = session?.user?.id;
  const userForms = await db.query.forms.findMany();
  console.log(userForms)
  return userForms;
}

export async function getCurrentForm(formID: string) {
  const formData = await db.query.forms.findFirst({
    where: eq(forms.formID, formID),
    with: {
      questions: true,
    },
  });
  return formData;
}
