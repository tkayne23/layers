-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-05-20 12:05:03.944

-- tables
-- Table: checkstubs
CREATE TABLE checkstubs (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    id_producing_tract uuid(2147483647)  NULL,
    document varchar(2147483647)  NULL,
    decimal_interest float8  NULL,
    amount float8  NULL,
    CONSTRAINT checkstubs_pkey PRIMARY KEY (id)
);

-- Table: deed
CREATE TABLE deed (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    document varchar(2147483647)  NULL,
    fractional_ownership float8  NULL,
    legal_desc varchar(2147483647)  NULL,
    gross_acreage float8  NULL,
    CONSTRAINT deed_pkey PRIMARY KEY (id)
);

-- Table: division_order
CREATE TABLE division_order (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    document varchar(2147483647)  NULL,
    fractional_ownership float8  NULL,
    decimal_interest float8  NULL,
    CONSTRAINT division_order_pkey PRIMARY KEY (id)
);

-- Table: dsu
CREATE TABLE dsu (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    legal_desc varchar(2147483647)  NULL,
    geom geometry(2147483647)  NULL,
    CONSTRAINT dsu_pkey PRIMARY KEY (id)
);

-- Table: for_sale
CREATE TABLE for_sale (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    id_property uuid(2147483647)  NULL,
    start_time timestamp  NULL,
    end_time timestamp  NULL,
    reserve int4  NULL,
    CONSTRAINT for_sale_pkey PRIMARY KEY (id)
);

-- Table: lease
CREATE TABLE lease (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    id_property uuid(2147483647)  NULL,
    document varchar(2147483647)  NULL,
    royalty_rate float8  NULL,
    CONSTRAINT lease_pkey PRIMARY KEY (id)
);

-- Table: offer
CREATE TABLE offer (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    amount float8  NULL,
    id_user uuid(2147483647)  NULL,
    id_property uuid(2147483647)  NULL,
    CONSTRAINT offer_pkey PRIMARY KEY (id)
);

-- Table: producing_tract
CREATE TABLE producing_tract (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    id_lease uuid(2147483647)  NULL,
    id_property uuid(2147483647)  NULL,
    id_division_order uuid(2147483647)  NULL,
    id_dsu uuid(2147483647)  NULL,
    CONSTRAINT producing_tract_pkey PRIMARY KEY (id)
);

-- Table: production_actuals
CREATE TABLE production_actuals (
    id_well_formation uuid(2147483647)  NOT NULL,
    date date  NOT NULL,
    oil_actuals float8  NULL,
    gas_actuals float8  NULL,
    CONSTRAINT production_actuals_pk PRIMARY KEY (id_well_formation,date)
);

-- Table: production_forecast_gas
CREATE TABLE production_forecast_gas (
    id_well_formation uuid(2147483647)  NOT NULL,
    date date  NOT NULL,
    months_on_gas int4  NULL,
    gas_actuals float8  NULL,
    gas_forecast float8  NULL,
    CONSTRAINT production_forecast_gas_pk PRIMARY KEY (id_well_formation,date)
);

-- Table: production_forecast_oil
CREATE TABLE production_forecast_oil (
    id_well_formation uuid(2147483647)  NOT NULL,
    date date  NOT NULL,
    months_on_oil int4  NULL,
    oil_actuals float8  NULL,
    oil_forecast float8  NULL,
    CONSTRAINT production_forecast_oil_pk PRIMARY KEY (id_well_formation,date)
);

-- Table: property
CREATE TABLE property (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    owner_id uuid(2147483647)  NULL,
    net_acreage int4  NULL,
    fractional_ownership int4  NULL,
    id_deed uuid(2147483647)  NULL,
    appraisal int4  NULL,
    gross_acreage int4  NULL,
    legal_desc int4  NULL,
    CONSTRAINT property_pkey PRIMARY KEY (id)
);

-- Table: section
CREATE TABLE section (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    sec varchar(2)  NULL,
    cnty_name varchar(255)  NULL,
    geom geometry(2147483647)  NOT NULL,
    id_township uuid(2147483647)  NOT NULL,
    CONSTRAINT section_pkey PRIMARY KEY (id)
);

-- Table: strip_price
CREATE TABLE strip_price (
    date date  NOT NULL,
    nymex_oil float8  NULL,
    nymex_gas float8  NULL,
    CONSTRAINT strip_price_pk PRIMARY KEY (date)
);

-- Table: township
CREATE TABLE township (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    twn varchar(3)  NULL DEFAULT NULL::character varying,
    rng varchar(3)  NULL,
    tdir varchar(3)  NULL,
    rdir varchar(3)  NULL,
    prim_code varchar(3)  NULL,
    geom geometry(2147483647)  NOT NULL,
    CONSTRAINT township_pk PRIMARY KEY (id)
);

-- Table: type_curve_section_gas
CREATE TABLE type_curve_section_gas (
    id_section uuid(2147483647)  NOT NULL,
    month_num int4  NOT NULL,
    gas_forecast int4  NULL,
    CONSTRAINT type_curve_section_gas_pk PRIMARY KEY (id_section,month_num)
);

-- Table: type_curve_section_oil
CREATE TABLE type_curve_section_oil (
    id_section uuid(2147483647)  NOT NULL,
    month_num int4  NOT NULL,
    oil_forecast int4  NULL,
    CONSTRAINT type_curve_section_oil_pk PRIMARY KEY (id_section,month_num)
);

-- Table: type_curve_township_gas
CREATE TABLE type_curve_township_gas (
    id_township uuid(2147483647)  NOT NULL,
    month_num int4  NOT NULL,
    gas_forecast int4  NULL,
    CONSTRAINT type_curve_township_gas_pk PRIMARY KEY (id_township,month_num)
);

-- Table: type_curve_township_oil
CREATE TABLE type_curve_township_oil (
    id_township uuid(2147483647)  NOT NULL,
    month_num int4  NOT NULL,
    oil_forecast int4  NULL,
    CONSTRAINT type_curve_township_oil_pk PRIMARY KEY (id_township,month_num)
);

-- Table: user
CREATE TABLE "user" (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    email varchar(2147483647)  NULL,
    display_name varchar(2147483647)  NULL,
    contact_address varchar(2147483647)  NULL,
    password varchar(2147483647)  NULL,
    company varchar(2147483647)  NULL,
    phone varchar(2147483647)  NULL,
    mfa varchar(2147483647)  NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

-- Table: well
CREATE TABLE well (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    api10 varchar(10)  NULL,
    well_name varchar(50)  NULL,
    operator varchar(50)  NULL,
    field varchar(30)  NULL,
    status varchar(2)  NULL,
    lat float8  NULL,
    lng float8  NULL,
    geom geometry(2147483647)  NULL,
    id_dsu uuid(2147483647)  NULL,
    CONSTRAINT well_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX well_api10_key on well (api10 ASC);

-- Table: well_formation
CREATE TABLE well_formation (
    id uuid(2147483647)  NOT NULL DEFAULT gen_random_uuid(),
    id_well uuid(2147483647)  NOT NULL,
    api12 varchar(12)  NOT NULL,
    ip_date_oil date  NULL,
    ip_date_gas date  NULL,
    CONSTRAINT well_formation_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX well_formation_id_well_api10_api12_key on well_formation (api12 ASC);

-- Table: well_property
CREATE TABLE well_property (
    id_well uuid(2147483647)  NOT NULL,
    id_property uuid(2147483647)  NOT NULL,
    fraction_overlap float8  NULL,
    CONSTRAINT well_property_pkey PRIMARY KEY (id_well,id_property)
);

-- Table: well_section
CREATE TABLE well_section (
    id_section uuid(2147483647)  NOT NULL,
    id_well uuid(2147483647)  NOT NULL,
    CONSTRAINT well_section_pkey PRIMARY KEY (id_section,id_well)
);

-- foreign keys
-- Reference: checkstubs_id_producing_tract_fkey (table: checkstubs)
ALTER TABLE checkstubs ADD CONSTRAINT checkstubs_id_producing_tract_fkey
    FOREIGN KEY (id_producing_tract)
    REFERENCES producing_tract (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: for_sale_id_property_fkey (table: for_sale)
ALTER TABLE for_sale ADD CONSTRAINT for_sale_id_property_fkey
    FOREIGN KEY (id_property)
    REFERENCES property (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: lease_id_property_fkey (table: lease)
ALTER TABLE lease ADD CONSTRAINT lease_id_property_fkey
    FOREIGN KEY (id_property)
    REFERENCES property (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: offer_id_property_fkey (table: offer)
ALTER TABLE offer ADD CONSTRAINT offer_id_property_fkey
    FOREIGN KEY (id_property)
    REFERENCES property (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: offer_id_user_fkey (table: offer)
ALTER TABLE offer ADD CONSTRAINT offer_id_user_fkey
    FOREIGN KEY (id_user)
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: producing_tract_dsu (table: producing_tract)
ALTER TABLE producing_tract ADD CONSTRAINT producing_tract_dsu
    FOREIGN KEY (id_dsu)
    REFERENCES dsu (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: producing_tract_id_division_order_fkey (table: producing_tract)
ALTER TABLE producing_tract ADD CONSTRAINT producing_tract_id_division_order_fkey
    FOREIGN KEY (id_division_order)
    REFERENCES division_order (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: producing_tract_lease (table: producing_tract)
ALTER TABLE producing_tract ADD CONSTRAINT producing_tract_lease
    FOREIGN KEY (id_lease)
    REFERENCES lease (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: producing_tract_property (table: producing_tract)
ALTER TABLE producing_tract ADD CONSTRAINT producing_tract_property
    FOREIGN KEY (id_property)
    REFERENCES property (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: production_actuals_well_formation (table: production_actuals)
ALTER TABLE production_actuals ADD CONSTRAINT production_actuals_well_formation
    FOREIGN KEY (id_well_formation)
    REFERENCES well_formation (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: production_forecast_gas_well_formation (table: production_forecast_gas)
ALTER TABLE production_forecast_gas ADD CONSTRAINT production_forecast_gas_well_formation
    FOREIGN KEY (id_well_formation)
    REFERENCES well_formation (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: production_forecast_oil_well_formation (table: production_forecast_oil)
ALTER TABLE production_forecast_oil ADD CONSTRAINT production_forecast_oil_well_formation
    FOREIGN KEY (id_well_formation)
    REFERENCES well_formation (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: property_id_deed_fkey (table: property)
ALTER TABLE property ADD CONSTRAINT property_id_deed_fkey
    FOREIGN KEY (id_deed)
    REFERENCES deed (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: section_township (table: section)
ALTER TABLE section ADD CONSTRAINT section_township
    FOREIGN KEY (id_township)
    REFERENCES township (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: type_curve_section_gas_section (table: type_curve_section_gas)
ALTER TABLE type_curve_section_gas ADD CONSTRAINT type_curve_section_gas_section
    FOREIGN KEY (id_section)
    REFERENCES section (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: type_curve_section_section (table: type_curve_section_oil)
ALTER TABLE type_curve_section_oil ADD CONSTRAINT type_curve_section_section
    FOREIGN KEY (id_section)
    REFERENCES section (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: type_curve_township_oil_township (table: type_curve_township_oil)
ALTER TABLE type_curve_township_oil ADD CONSTRAINT type_curve_township_oil_township
    FOREIGN KEY (id_township)
    REFERENCES township (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: type_curve_township_township (table: type_curve_township_gas)
ALTER TABLE type_curve_township_gas ADD CONSTRAINT type_curve_township_township
    FOREIGN KEY (id_township)
    REFERENCES township (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: well_dsu (table: well)
ALTER TABLE well ADD CONSTRAINT well_dsu
    FOREIGN KEY (id_dsu)
    REFERENCES dsu (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: well_formation_well (table: well_formation)
ALTER TABLE well_formation ADD CONSTRAINT well_formation_well
    FOREIGN KEY (id_well)
    REFERENCES well (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: well_property_id_property_fkey (table: well_property)
ALTER TABLE well_property ADD CONSTRAINT well_property_id_property_fkey
    FOREIGN KEY (id_property)
    REFERENCES property (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: well_property_well (table: well_property)
ALTER TABLE well_property ADD CONSTRAINT well_property_well
    FOREIGN KEY (id_well)
    REFERENCES well (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: well_section_section (table: well_section)
ALTER TABLE well_section ADD CONSTRAINT well_section_section
    FOREIGN KEY (id_section)
    REFERENCES section (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: well_section_well (table: well_section)
ALTER TABLE well_section ADD CONSTRAINT well_section_well
    FOREIGN KEY (id_well)
    REFERENCES well (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

