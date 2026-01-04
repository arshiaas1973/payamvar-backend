use std::{collections::HashMap, hash::Hash};

use crate::routes::{self};

pub fn routes() -> HashMap<&'static str, Vec<rocket::Route>> {
    let mut all_routes = HashMap::new();
    all_routes.insert("/users",routes::v1::users::routes());
    all_routes
}