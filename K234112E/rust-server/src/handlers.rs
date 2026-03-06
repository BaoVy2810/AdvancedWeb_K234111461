use std::env;
use warp::{reject, Rejection, Reply};

use crate::error::DataError;

pub async fn get_data_handler() -> Result<impl Reply, Rejection> {
    let api_key = env::var("API_KEY")
        .map_err(DataError::from)
        .map_err(reject::custom)?;

    let client = reqwest::Client::new();
    let res = client
        .get("https://api.example.com/data")
        .header("X-Api-Key", api_key)
        .send()
        .await
        .map_err(DataError::from)
        .map_err(reject::custom)?;

    let data: serde_json::Value = res
        .json()
        .await
        .map_err(DataError::from)
        .map_err(reject::custom)?;

    Ok(warp::reply::json(&data))
}
