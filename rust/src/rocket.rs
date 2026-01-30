use rocket::{Rocket, Build};

use crate::{catchers, middlewares, routes};

pub fn rocket() -> Rocket<Build> {
    let mut rocket: Rocket<Build> = rocket::build();
    for item in routes::main::routes() {
        for child in item.1 {
            rocket = rocket.mount(format!("/api{}{}", item.0, child.0), child.1);
        }
    }
    rocket = rocket.register("/", catchers::main::routes());
    for item in middlewares::main::fairings(){
        rocket = rocket.attach(item);
    }
    rocket
}