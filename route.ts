// Only public keys are accepted: never return a secret/service_role key.
export const dynamic = 'force-dynamic';
function isPublicKey(key:string){
 if(key.startsWith('sb_publishable_'))return true;
 try {return JSON.parse(atob(key.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))).role==='anon';}catch{return false;}
}
export async function GET() {
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL||'';
 const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||'';
 const valid= /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)&&isPublicKey(key);
 const contact = process.env.KOMPO_PRIVACY_CONTACT || '';
 const privacyContact = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? contact : '';
 return Response.json({url:valid?url:'',key:valid?key:'',privacyContact},{headers:{'Cache-Control':'no-store'}});
}
