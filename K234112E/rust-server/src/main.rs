mod error;
mod handlers;

use warp::Filter;

use crate::error::DataError;
use handlers::get_data_handler;

#[tokio::main]
async fn main() {
    let hello = warp::path!("hello").map(|| "Hello, world!");

    let data = warp::path!("data")
        .and(warp::get())
        .and_then(get_data_handler);

    let routes = hello
        .or(data)
        .recover(|rejection: warp::Rejection| async move {
            if let Some(err) = rejection.find::<DataError>() {
                return Ok::<_, std::convert::Infallible>(warp::reply::with_status(
                    warp::reply::json(&serde_json::json!({ "error": err.message() })),
                    err.status_code(),
                ));
            }
            Ok(warp::reply::with_status(
                warp::reply::json(&serde_json::json!({ "error": "Internal server error" })),
                warp::http::StatusCode::INTERNAL_SERVER_ERROR,
            ))
        });

    warp::serve(routes)
        .run(([127, 0, 0, 1], 3030))
        .await;
}
