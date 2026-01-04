use rocket::{Catcher, Route, catch, catchers, routes, serde::json::Json};

use crate::catchers::error::ApiError;

#[catch(404)]
pub fn not_found() -> Json<ApiError> { 
    Json(ApiError{
        status: 404,
        error: "Resource not found".to_string()
    })
}

pub fn routes() -> Vec<Catcher>{
    catchers![not_found]
}