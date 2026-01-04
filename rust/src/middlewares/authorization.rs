use dotenvy::{EnvLoader};
use rocket::fairing::{Fairing, Info, Kind};
use rocket::{Data, Request};
use rocket::http::Status;

pub struct ApiKeyFairing;

#[rocket::async_trait]
impl Fairing for ApiKeyFairing {
    fn info(&self) -> Info {
        Info {
            name: "API Key Guard",
            kind: Kind::Request,
        }
    }

    async fn on_request(&self, request: &mut Request<'_>, _: &mut Data<'_>) {
        let env_map = EnvLoader::new().load()?;
        match env_map{
            Err(error) => {
                println!("Error loading .env file: {}", error);
                return Outcome::Failure((Status::InternalServerError, ()));
            },
            Ok(_) => {},
        }
        let api_key = match env_map.unwrap().get("API_KEY"){
            Some(key) => key,
            None => {
                println!("API_KEY not found in .env file");
                return Outcome::Failure((Status::InternalServerError, ()));
            }
        };
        if request.uri().path().starts_with("/api") {
            match request.headers().get_one("x-api-key") {
                Some(api_key) => {}
                _ => request.set_status(Status::Unauthorized),
            }
        }
    }
}