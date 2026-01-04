use std::collections::HashMap;

use rocket::{Route,routes};

use crate::routes;

pub fn routes() -> HashMap<&'static str, HashMap<&'static str, Vec<Route>>> {
    let mut all_routes = HashMap::new();
    all_routes.insert("/v1",routes::v1::main::routes());
    all_routes
}