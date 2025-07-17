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
        crypto_id       INT NOT NULL,
        fiat_id         INT NOT NULL,
        quantity        DECIMAL(36, 18) NOT NULL,
        price           DECIMAL(18, 8) NOT NULL,
        total_amount    DECIMAL(18, 8) NOT NULL,
        trade_status    ENUM ('pending', 'completed', 'cancelled') DEFAULT 'pending',
        created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
        completed_at    DATETIME,
        FOREIGN KEY (buyer_id) REFERENCES users (user_id),
        FOREIGN KEY (seller_id) REFERENCES users (user_id),
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
        completed_at    DATETIME,
        FOREIGN KEY (sender_id) REFERENCES users (user_id),
        FOREIGN KEY (receiver_id) REFERENCES users (user_id),
        FOREIGN KEY (crypto_id) REFERENCES crypto_currencies (crypto_id)
    );