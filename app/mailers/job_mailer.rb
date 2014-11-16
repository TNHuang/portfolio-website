class JobMailer < ActionMailer::Base
  default from: "<kenny@kennyhuang7.com>"

  def send_mail(sender_name, sender_email, message)
    @sender = {:name => sender_name, :email => sender_email, :message => message}
    mail(
      from: @sender[:email],
      to: "www.khuangtai@gmail.com",
      subject: "An employer #{@sender[:name]} has contact you with a job information"
    )
  end
end
