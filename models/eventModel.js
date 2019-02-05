class eventModel {
    
    constructor(dao) {
        this.dao = dao;
    }
    
    create() {

        return this.dao.run(`
            CREATE TABLE if not exists events(
                id INTEGER UNIQUE,
                type TEXT,
                actor_id INTEGER,
                repo_id INTEGER,
                created_at date)`);
    }
    
    all() {
        
        return this.dao.all(`
            SELECT
                events.*,
                actors.login,
                actors.avatar_url,
                repos.name,
                repos.url
            FROM events
                LEFT JOIN actors ON actors.id = events.actor_id
                LEFT JOIN repos ON repos.id = events.repo_id
            ORDER BY events.id ASC`);
    }
    
    get(id) {
        
        return this.dao.get(`SELECT * FROM events WHERE id = ?`, id);
    }
    
    insert(id, type, actor_id, repo_id, created_at) {
        
        return this.dao.run(
            `INSERT INTO events (id, type, actor_id, repo_id, created_at) values(?,?,?,?,?)`,
            [id, type, actor_id, repo_id, created_at]);
    }
    
    deleteAll() {
        
        return this.dao.run(`DELETE FROM events`);
    }
    
    delete(id){
        
        return this.dao.run(`DELETE FROM events WHERE id = ?`,[id]);
    }
    
    getAllByActorId(id, orderByEventDate) {
        
        return this.dao.all(`
            SELECT
                events.*,
                actors.login,
                actors.avatar_url,
                repos.name,
                repos.url
            FROM events
                INNER JOIN actors ON actors.id = events.actor_id
                LEFT JOIN repos ON repos.id = events.repo_id
            WHERE events.actor_id = ?
            ORDER BY ${(orderByEventDate) ? 'events.created_at ASC' : 'events.id ASC'}`, [id]);
    }
}

module.exports = eventModel;