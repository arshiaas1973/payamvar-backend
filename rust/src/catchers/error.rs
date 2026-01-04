use rocket::serde::Serialize;

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
pub struct ApiError{
    pub status: u16,
    pub error: String,
}