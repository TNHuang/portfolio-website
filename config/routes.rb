Rails.application.routes.draw do
  root to: "static#index"
  post "mail", to: "static#send_mail", as: "mail_url"
end
