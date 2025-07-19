CREATE TABLE
    users (
        user_id         INT AUTO_INCREMENT PRIMARY KEY,
        username        VARCHAR(50) UNIQUE NOT NULL,
        email           VARCHAR(100) UNIQUE NOT NULL,
        password_hash   VARCHAR(255) NOT NULL,
        created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        is_active       BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    crypto_currencies (
        crypto_id       INT AUTO_INCREMENT PRIMARY KEY,
        symbol          VARCHAR(10) UNIQUE NOT NULL,
        crypto_name     VARCHAR(50) NOT NULL,
        current_price   DECIMAL(18, 8) NOT NULL,
        is_active       BOOLEAN DEFAULT TRUE,
        updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    fiat_currencies (
        fiat_id         INT AUTO_INCREMENT PRIMARY KEY,
        currency_code   VARCHAR(10) UNIQUE NOT NULL,
        currency_name   VARCHAR(50) NOT NULL,
        rate_to_usd     DECIMAL(18, 8) NOT NULL,
        is_active       BOOLEAN DEFAULT TRUE,
        updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    wallets (
        wallet_id       INT AUTO_INCREMENT PRIMARY KEY,
        user_id         INT NOT NULL,
        crypto_id       INT NOT NULL,
        balance         DECIMAL(36, 18) DEFAULT 0,
        created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (crypto_id) REFERENCES crypto_currencies (crypto_id)
    );

CREATE TABLE
    fiat_wallets (
        fiat_wallet_id  INT AUTO_INCREMENT PRIMARY KEY,
        user_id         INT NOT NULL,
        fiat_id         INT NOT NULL,
        balance         DECIMAL(18, 2) DEFAULT 0,
        created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (fiat_id) REFERENCES fiat_currencies (fiat_id)
    );

CREATE TABLE
    orders (
        order_id        INT AUTO_INCREMENT PRIMARY KEY,
        user_id         INT NOT NULL,
        crypto_id       INT NOT NULL,
        fiat_id         INT NOT NULL,
        order_type      ENUM ('buy', 'sell') NOT NULL,
        quantity        DECIMAL(36, 18) NOT NULL,
        price           DECIMAL(18, 8) NOT NULL,
        total_amount    DECIMAL(18, 8) NOT NULL,
        order_status    ENUM ('pending', 'completed', 'cancelled') DEFAULT 'pending',
        created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (crypto_id) REFERENCES crypto_currencies (crypto_id),
        FOREIGN KEY (fiat_id) REFERENCES fiat_currencies (fiat_id)
    );

CREATE TABLE
    trades (
        trade_id        INT AUTO_INCREMENT PRIMARY KEY,
        buyer_id        INT NOT NULL,
        seller_id       INT NOT NULL,
        order_id_buyer  INT NOT NULL,
        order_id_seller INT NOT NULL,
        crypto_id       INT NOT NULL,
        fiat_id         INT NOT NULL,
        quantity        DECIMAL(36, 18) NOT NULL,
        price           DECIMAL(18, 8) NOT NULL,
        total_amount    DECIMAL(18, 8) NOT NULL,
        trade_status    ENUM ('pending', 'completed', 'cancelled') DEFAULT 'pending',
        created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer_id) REFERENCES users (user_id),
        FOREIGN KEY (seller_id) REFERENCES users (user_id),
        FOREIGN KEY (order_id_buyer) REFERENCES orders (order_id),
        FOREIGN KEY (order_id_seller) REFERENCES orders (order_id),
        FOREIGN KEY (crypto_id) REFERENCES crypto_currencies (crypto_id),
        FOREIGN KEY (fiat_id) REFERENCES fiat_currencies (fiat_id)
    );

CREATE TABLE
    transactions (
        trans_id        INT AUTO_INCREMENT PRIMARY KEY,
        sender_id       INT NOT NULL,
        receiver_id     INT NOT NULL,
        crypto_id       INT NOT NULL,
        trans_type      ENUM ('transfer', 'deposit', 'withdrawal') NOT NULL,
        amount          DECIMAL(36, 18) NOT NULL,
        trans_status    ENUM ('pending', 'completed', 'failed') DEFAULT 'pending',
        created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users (user_id),
        FOREIGN KEY (receiver_id) REFERENCES users (user_id),
        FOREIGN KEY (crypto_id) REFERENCES crypto_currencies (crypto_id)
    );



INSERT INTO users (username, email, password_hash, is_active) VALUES
('alice', 'alice@example.com', 'hash_alice', TRUE),
('bob', 'bob@example.com', 'hash_bob', TRUE);


INSERT INTO crypto_currencies (symbol, crypto_name, current_price, is_active) VALUES
('BTC', 'Bitcoin', 30000.00, TRUE),
('ETH', 'Ethereum', 2000.00, TRUE);


INSERT INTO fiat_currencies (currency_code, currency_name, rate_to_usd, is_active) VALUES
('USD', 'US Dollar', 1.0000, TRUE),
('THB', 'Thai Baht', 0.0300, TRUE);


INSERT INTO wallets (user_id, crypto_id, balance) VALUES
(1, 1, 1.5),   
(2, 2, 10.0);  


INSERT INTO fiat_wallets (user_id, fiat_id, balance) VALUES
(1, 1, 310000.00),  
(2, 1, 300000.00); 


INSERT INTO orders (user_id, crypto_id, fiat_id, order_type, quantity, price, total_amount, order_status) VALUES
(1, 1, 1, 'sell', 0.1, 31000.00, 3100.00, 'pending'),  
(2, 1, 1, 'buy', 1.0, 2000.00, 2000.00, 'pending');    