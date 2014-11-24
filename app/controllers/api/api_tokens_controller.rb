class Api::ApiTokensController < ApiController
  respond_to :json
  skip_before_filter :restrict_access, :only => [:create]

  def create
    authenticated_user = User.find_by_email(login_params[:email]).authenticate(login_params[:password])
    respond_to do |format|
      format.json {
        if authenticated_user
          @api_token = ApiToken.create(user: authenticated_user)
          render :json => {:user_id => authenticated_user.id, :api_token => @api_token.api_token}
        else
          head :unauthorized
        end
      }
    end
  end

  def destroy
    ApiToken.where(:api_token => @token).destroy_all
    head :ok
  end

  private

  def login_params
    params.require(:login).permit(:email, :password)
  end
end
