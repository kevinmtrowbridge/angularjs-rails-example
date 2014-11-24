class Api::UsersController < ApiController
  respond_to :json
  skip_before_filter :restrict_access, :only => [:create]

  def create
    respond_to do |format|
      format.json {
        @user = User.create(user_params)
        render :json => @user.as_json(:except => [:password_digest])
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
