/* CREATION DE LA TABLE ARTICLES */

CREATE TABLE node_articles (
                               id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                               title VARCHAR(128) NOT NULL,
                               content VARCHAR(256) NOT NULL,   /* correction content TEXT NOT NULL; */
                               author INT NOT NULL,
                               created_at DATETIME NOT NULL,  /* coorection pas de not null => DEFAULT CURRENT_TIMESTAMP */
                               FOREIGN KEY (author) REFERENCES node_users(id)  /* correction: pour que se soit universel  on le note :
                                                                                  CONSTRAINT FK_articles_author FOREIGN KEY (author) REFERENCES node_users(id)
                                                                                  une contrainte ne peut avoir le même nom qu'une seule fois par BDD */
);

/* CREATION DE LA TABLE COMMENTS */

CREATE TABLE node_comments (
                               id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                               article_id INT NOT NULL,
                               content VARCHAR(256),      /* correction content TEXT NOT NULL; */
                               author INT NOT NULL,
                               created_at DATETIME,
                               FOREIGN KEY (article_id) REFERENCES node_articles(id), /* constraint FK_comments_article_id */
                               FOREIGN KEY (author) REFERENCES node_users(id) /*FK_comments_author */
);