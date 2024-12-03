CREATE TABLE IF NOT EXISTS user(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL
);
CREATE TABLE IF NOT EXISTS student(
    student_id INT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    faculty VARCHAR(100) NOT NULL,
    recieved_date TIMESTAMP,
    charged_pages INT,
    free_pages_per_year INT,
    address_id INT NOT NULL,
    student_number VARCHAR(100) GENERATED ALWAYS AS (CONCAT('STU', student_id)) VIRTUAL UNIQUE,
    PRIMARY KEY(student_id),
    FOREIGN KEY (student_id) references user(user_id) ON DELETE CASCADE,
	FOREIGN KEY (address_id) references address(address_id) ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS admin(
	admin_id INT references user(user_id),
    admin_number VARCHAR(100) GENERATED ALWAYS AS (CONCAT('STU', admin_id)) VIRTUAL UNIQUE,
    PRIMARY KEY (admin_id)
);

CREATE TABLE IF NOT EXISTS printer(
	printer_id INT PRIMARY KEY,
	printer_number VARCHAR(100) GENERATED ALWAYS AS (CONCAT('PRN', printer_id)) VIRTUAL UNIQUE,
    permitted_file_type VARCHAR(100),
    short_description VARCHAR(100),
    enabled boolean,
    printer_model VARCHAR(100),
    brand VARCHAR(100),
    campus_name VARCHAR(100),
    building_name VARCHAR(100),
    room_number VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS file(
	file_id int,
    student_id int,
    file_name VARCHAR(100),
    file_type VARCHAR(100),
    PRIMARY KEY (file_id,student_id),
	FOREIGN KEY (student_id) references student(student_id) 
);
CREATE TABLE IF NOT EXISTS log(
	log_id INT,
    file_id INT,
    student_id INT,
    printing_properties_id INT,
    start_time  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    PRIMARY KEY (log_id,file_id,student_id,printing_properties_id),
    FOREIGN KEY (file_id) references file(file_id),
    FOREIGN KEY (printing_properties_id) references printing_properties(printing_properties_id)
    
);

CREATE TABLE IF NOT EXISTS address(
	address_id INT AUTO_INCREMENT PRIMARY KEY,
	street VARCHAR(100),
    city VARCHAR(100),
    province VARCHAR(100) ,
    country VARCHAR(100) default 'VIETNAM',
    UNIQUE (street, city, province,country)
);

CREATE TABLE IF NOT EXISTS configure_by(
	admin_id INT,
    student_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) references admin(admin_id),
    FOREIGN KEY (student_id) references student(student_id)
);

CREATE TABLE IF NOT EXISTS configure_printer(
	admin_id INT,
    printer_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (admin_id,student_id),
    FOREIGN KEY (admin_id) references admin(admin_id),
    FOREIGN KEY (printer_id) references student(student_id)
);

CREATE TABLE IF NOT EXISTS printing_properties(
	printing_properties_id int,
	student_id INT,
    printer_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (printer_id,student_id,printing_properties_id),
    FOREIGN KEY (student_id) references student(student_id),
    FOREIGN KEY (printer_id) references printer(printer_id)
);

CREATE TABLE IF NOT EXISTS pages_to_be_printed(
	pages_to_be_printed_id INT AUTO_INCREMENT PRIMARY KEY,
	ordinal_number long,
    ordinal_number_file long,
    ordinal_number_log long,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (ordinal_number_log) references log(ordinal_number)
);
