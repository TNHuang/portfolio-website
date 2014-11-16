Rails.application.routes.draw do
  root to: "static#index", as: "root"
  post "mail", to: "static#send_mail", as: "mail"
end
