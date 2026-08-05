import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const emails = process.argv.slice(2);

if (emails.length === 0) {
  throw new Error("Usage: node scripts/grant-admin.mjs admin@example.com [another-admin@example.com]");
}

initializeApp({ credential: applicationDefault() });

const auth = getAuth();

if (emails.length === 1 && emails[0] === "--list") {
  const { users } = await auth.listUsers();
  users.forEach((user) => console.log(`${user.email ?? "(no email)"} (${user.uid})`));
  process.exit(0);
}

let failures = 0;

for (const email of emails) {
  try {
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin claim granted to ${user.email} (${user.uid}).`);
  } catch (error) {
    failures += 1;
    console.error(`Could not grant admin access to ${email}: ${error.code ?? error.message}`);
  }
}

if (failures > 0) process.exitCode = 1;
