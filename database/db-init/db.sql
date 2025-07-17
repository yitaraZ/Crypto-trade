CREATE TABLE USERS (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE CRYPTO_CURRENCIES (
    crypto_id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    current_price DECIMAL(18,8) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE FIAT_CURRENCIES (
    fiat_id INT AUTO_INCREMENT PRIMARY KEY,
    currency_code VARCHAR(10) UNIQUE NOT NULL,
    currency_name VARCHAR(50) NOT NULL,
    exchange_rate_to_usd DECIMAL(18,8) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE WALLETS (
    wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    crypto_id INT NOT NULL,
    balance DECIMAL(36,18) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (crypto_id) REFERENCES CRYPTOCURRENCIES(crypto_id)
);

CREATE TABLE FIAT_WALLETS (
    fiat_wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    fiat_id INT NOT NULL,
    balance DECIMAL(18,2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (fiat_id) REFERENCES FIAT_CURRENCIES(fiat_id)
);

CREATE TABLE ORDERS (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    crypto_id INT NOT NULL,
    fiat_id INT NOT NULL,
    order_type ENUM('buy', 'sell') NOT NULL,
    quantity DECIMAL(36,18) NOT NULL,
    price DECIMAL(18,8) NOT NULL,
    total_amount DECIMAL(18,8) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (crypto_id) REFERENCES CRYPTOCURRENCIES(crypto_id),
    FOREIGN KEY (fiat_id) REFERENCES FIAT_CURRENCIES(fiat_id)
);

CREATE TABLE TRADES (
    trade_id INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    crypto_id INT NOT NULL,
    fiat_id INT NOT NULL,
    quantity DECIMAL(36,18) NOT NULL,
    price DECIMAL(18,8) NOT NULL,
    total_amount DECIMAL(18,8) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (buyer_id) REFERENCES USERS(user_id),
    FOREIGN KEY (seller_id) REFERENCES USERS(user_id),
    FOREIGN KEY (crypto_id) REFERENCES CRYPTOCURRENCIES(crypto_id),
    FOREIGN KEY (fiat_id) REFERENCES FIAT_CURRENCIES(fiat_id)
);

CREATE TABLE TRANSACTIONS (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    from_user_id INT NOT NULL,
    to_user_id INT NOT NULL,
    crypto_id INT NOT NULL,
    transaction_type ENUM('transfer', 'deposit', 'withdrawal') NOT NULL,
    amount DECIMAL(36,18) NOT NULL,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    external_address VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (from_user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (to_user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (crypto_id) REFERENCES CRYPTOCURRENCIES(crypto_id)
);
