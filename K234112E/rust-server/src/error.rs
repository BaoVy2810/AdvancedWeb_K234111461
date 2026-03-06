// Custom error type for the /data handler so we can use `?` and warp rejections.

use std::env::VarError;
use warp::reject::Reject;

#[derive(Debug)]
pub enum DataError {
    ApiKeyMissing(VarError),
    HttpRequest(reqwest::Error),
    JsonParse(serde_json::Error),
}

impl Reject for DataError {}

impl From<VarError> for DataError {
    fn from(e: VarError) -> Self {
        DataError::ApiKeyMissing(e)
    }
}

impl From<reqwest::Error> for DataError {
    fn from(e: reqwest::Error) -> Self {
        DataError::HttpRequest(e)
    }
}

impl From<serde_json::Error> for DataError {
    fn from(e: serde_json::Error) -> Self {
        DataError::JsonParse(e)
    }
}

impl DataError {
    pub fn status_code(&self) -> warp::http::StatusCode {
        use warp::http::StatusCode;
        match self {
            DataError::ApiKeyMissing(_) => StatusCode::INTERNAL_SERVER_ERROR,
            DataError::HttpRequest(_) => StatusCode::BAD_GATEWAY,
            DataError::JsonParse(_) => StatusCode::BAD_GATEWAY,
        }
    }

    pub fn message(&self) -> &'static str {
        match self {
            DataError::ApiKeyMissing(_) => "API_KEY environment variable not set",
            DataError::HttpRequest(_) => "Failed to fetch data from upstream",
            DataError::JsonParse(_) => "Failed to parse response JSON",
        }
    }
}
