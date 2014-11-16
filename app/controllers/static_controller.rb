class StaticController < ApplicationController

  def index
    render :index
  end
  def send_mail
    @sender_name = params[:sender_name]
    @sender_email = params[:sender_email]
    @message = params[:message]

    msg = JobMailer.send_mail(@sender_name, @sender_email, @message)
    msg.deliver!
    flash[:notice] = "Your mail was sent!"
    redirect_to root_url
  end

  private
  def mail_params
    params.permit(:sender_email, :sender_name, :message)
  end
end
