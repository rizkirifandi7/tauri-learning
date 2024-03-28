// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Debug, serde::Deserialize)]
struct User {
    name: String,
    email: String,
}

#[tauri::command]
fn save_user(user: User) -> Result<(), String> {
    if user.name.is_empty() || user.email.is_empty() {
        Err("Name and email cannot be empty".into())
    } else {
        println!("Saved user: {}", user.name);
        println!("Saved user: {}", user.email);
        Ok(())
    }
}

#[tauri::command]
fn trigger_event(window: tauri::Window) {
    window
        .emit("my_event", Some("Hello! from Indonesia"))
        .unwrap();
}

#[derive(serde::Deserialize)]
struct Calculation {
    num1: f64,
    num2: f64,
    operator: String,
}

#[tauri::command]
fn calculate(data: Calculation) -> f64 {
    if data.operator == "+" {
        data.num1 + data.num2
    } else if data.operator == "-" {
        data.num1 - data.num2
    } else if data.operator == "*" {
        data.num1 * data.num2
    } else if data.operator == "/" {
        data.num1 / data.num2
    } else {
        0.0
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            save_user,
            trigger_event,
            calculate
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
