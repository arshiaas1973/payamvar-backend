use rocket::{Route, get, routes};

#[get("/")]
fn index() -> &'static str {
    "User index"
}

pub fn routes() -> Vec<Route> {
    routes![index]
}