use rocket::fairing::Fairing;

use crate::middlewares::authorization;

pub fn fairings() -> Vec<dyn Fairing> {
    vec![
        authorization::AuthorizationFairing,
    ]
}