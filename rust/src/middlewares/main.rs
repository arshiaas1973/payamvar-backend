use rocket::fairing::Fairing;

use crate::middlewares::authorization::{self, ApiKeyFairing};

pub fn fairings() -> Vec<Box<dyn Fairing>> {
    vec![
        Box::new(authorization::ApiKeyFairing),
    ]
}