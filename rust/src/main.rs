
#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    payamvar::rocket::rocket().launch().await?;
    Ok(())
}
