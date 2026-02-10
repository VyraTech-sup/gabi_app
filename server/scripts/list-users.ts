import { getDb } from '../db';
import { users } from '../../drizzle/schema';

async function listUsers() {
  const db = await getDb();
  if (!db) {
    console.error('❌ Database not available');
    process.exit(1);
  }

  console.log('\n📋 USUÁRIOS NO BANCO DE DADOS:\n');
  
  const allUsers = await db.select().from(users);
  
  if (allUsers.length === 0) {
    console.log('Nenhum usuário encontrado.');
  } else {
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name || 'Sem nome'}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   📱 Telefone: ${user.phone || 'Não informado'}`);
      console.log(`   🔐 Tem senha: ${user.password ? 'SIM ✅' : 'NÃO (OAuth)'}`);
      console.log(`   🆔 ID: ${user.id}`);
      console.log(`   🔑 OpenID: ${user.openId || 'Email/Password user'}`);
      console.log(`   📅 Criado em: ${user.createdAt}`);
      console.log(`   🔓 Método: ${user.loginMethod}`);
      console.log(`   👤 Role: ${user.role}`);
      console.log('');
    });
    console.log(`\n✅ Total: ${allUsers.length} usuário(s)\n`);
  }

  process.exit(0);
}

listUsers().catch((error) => {
  console.error('❌ Erro:', error);
  process.exit(1);
});
