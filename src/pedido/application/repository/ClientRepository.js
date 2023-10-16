class ClientRepository
{

    constructor (database) {
        this.db = database;
    }

    async store(client) {
        return await this.db.store(
            `INSERT INTO clients 
                (name,email, cpf_cnpj, birthday, created, modified) 
             VALUES 
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [client.name, client.email, 
                client.cpf_cnpj, client.birthday]);    
    }

    async update(client, id){
        await this.db.store(
            `UPDATE clients SET
                name = ?,
                email = ?,
                cpf_cnpj = ?,
                birthday = ?,
                modified = NOW()
             WHERE id = ?;
            `, [client.name, client.email, 
                client.cpf_cnpj, client.birthday, 
                id]); 
        client.id = id;
        return client;
    }

    async findById(id){
        return await this.db.query(`SELECT * FROM clients where id = ${id};`);
    }

    async all(params){
        return await this.db.query(`SELECT * FROM clients;`);
    }

    async delete(id){
        return await this.db.delete(`DELETE FROM clients where id = ${id};`);
    }

}

export default ClientRepository