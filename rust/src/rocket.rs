use rocket::{Rocket, Build};

use crate::routes;

pub fn rocket() -> Rocket<Build> {
    rocket::build()
        .mount("/api", routes::main::routes())
        .mount("/", routes![index])
}