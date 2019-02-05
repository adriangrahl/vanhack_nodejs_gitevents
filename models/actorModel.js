class actorModel {
    
    constructor(dao) {
        this.dao = dao;
    }
    
    create() {

        return this.dao.run(`
            CREATE TABLE if not exists actors(
                id INTEGER UNIQUE,
                login TEXT,
                avatar_url TEXT)`);
    }
    
    all() {
        
        return this.dao.all(`SELECT * FROM actors`);
    }
    
    get(id) {
        
        return this.dao.get(`SELECT * FROM actors WHERE id = ?`, id);
    }
    
    insert(id, login, avatar_url) {
        
        return this.dao.run(
            `INSERT INTO actors (id, login, avatar_url) values(?,?,?)`,
            [id, login, avatar_url]);
    }
    
    deleteAll() {
        
        return this.dao.run(`DELETE FROM actors`);
    }
    
    delete(id){
        
        return this.dao.run(`DELETE FROM actors WHERE id = ?`,[id]);
    }
    
    update(id, login, avatar_url) {
        return this.dao.run(`
            UPDATE actors SET login = ?, avatar_url = ?
            WHERE id = ?`, [login, avatar_url, id]);
    }
    
    getAllWithMostEvents() {
        
        return this.dao.all(`
            SELECT
                actors.id,
                actors.login,
                actors.avatar_url,
                count(events.id)
            FROM actors
            INNER JOIN events where events.actor_id = actors.id
            GROUP BY actors.id, actors.login, actors.avatar_url
            ORDER BY
                count(events.id) DESC,
                events.created_at DESC,
                actors.login ASC
        `);
    }
    
    count() {
        
        return this.dao.get(`SELECT count(actors.id) as num_actors FROM actors`);
    }
    
    getAllId() {
        
        return this.dao.all(`SELECT id FROM actors`);
    }
    
    createTemp() {

        return this.dao.run(`
            CREATE TABLE if not exists temp_actors(
                id INTEGER UNIQUE,
                login TEXT,
                avatar_url TEXT,
                max_streak INTEGER,
                last_event date)`);
    }
    
    getAllEventsActors() {
        
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
            ORDER BY events.actor_id ASC`);
    }
    
    insertTempStreak(id, login, avatar_url, max_streak, last_event) {
        
        return this.dao.run(
            `INSERT INTO temp_actors(id, login, avatar_url, max_streak, last_event) values(?,?,?,?,?)`,
            [id, login, avatar_url, max_streak, last_event]);
    }
    
    getAllStreaks() {
        return this.dao.all(`
            SELECT * FROM temp_actors
            ORDER BY max_streak DESC, last_event DESC, login ASC
        `);
    }
}

module.exports = actorModel;