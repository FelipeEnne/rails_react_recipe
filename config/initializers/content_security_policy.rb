# frozen_string_literal: true

Rails.application.config.content_security_policy do |policy|
  policy.default_src :self, :https
  policy.font_src    :self, :https, :data
  policy.img_src     :self, :https, :data
  policy.object_src  :none
  policy.style_src   :self, :https, :unsafe_inline
    # Allow @vite/client to hot reload style changes in development
#    policy.style_src *policy.style_src, :unsafe_inline if Rails.env.development?

  policy.connect_src :self, :https
    # Allow @vite/client to hot reload changes in development
#    policy.connect_src *policy.connect_src, "ws://#{ ViteRuby.config.host_with_port }" if Rails.env.development?


  if Rails.env.development?
    vite_host = "http://#{ViteRuby.config.host_with_port}"
    policy.script_src :self, :https, :unsafe_inline, :unsafe_eval, vite_host
    # Allow @vite/client to hot reload javascript changes in development
#    policy.script_src *policy.script_src, :unsafe_eval, "http://#{ ViteRuby.config.host_with_port }" if Rails.env.development?

    # You may need to enable this in production as well depending on your setup.
#    policy.script_src *policy.script_src, :blob if Rails.env.test?

    policy.connect_src :self, :https, vite_host, "ws://#{ViteRuby.config.host_with_port}"
  else
    policy.script_src :self, :https
  end
end

Rails.application.config.content_security_policy_nonce_generator = ->(_request) { SecureRandom.base64(16) }
Rails.application.config.content_security_policy_nonce_directives = %w[script-src]
