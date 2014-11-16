module ApplicationHelper

    def form_auth
      <<-HTML.html_safe
      <input
        name="authenticity_token"
        value="#{form_authenticity_token}"
        type="hidden">
      HTML
    end
end
