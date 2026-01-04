// @generated automatically by Diesel CLI.

diesel::table! {
    sessions (id) {
        id -> Int8,
        user_id -> Int8,
        #[max_length = 45]
        ip_address -> Varchar,
        #[max_length = 100]
        os -> Nullable<Varchar>,
        #[max_length = 100]
        browser -> Nullable<Varchar>,
        #[max_length = 255]
        session_token -> Varchar,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
        expires_at -> Timestamp,
        deleted_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    users (id) {
        id -> Int8,
        #[max_length = 50]
        username -> Varchar,
        #[max_length = 100]
        email -> Varchar,
        #[max_length = 255]
        password_hash -> Varchar,
        password -> Nullable<Text>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
        deleted_at -> Nullable<Timestamp>,
    }
}

diesel::joinable!(sessions -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(sessions, users,);
