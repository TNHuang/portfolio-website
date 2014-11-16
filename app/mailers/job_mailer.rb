class JobMailer < ActionMailer::Base
  default from: "kennyhuang7.com"

  def send_mail(sender_name, sender_email, message)
    mail(
      from: sender_email,
      to: "khuangtai@gmail.com",
      subject: "An employer #{sender_name} has contact you with a job information"
    )
  end
end
