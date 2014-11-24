class CreateApiTokens < ActiveRecord::Migration
  def change
    create_table :api_tokens do |t|
      t.string :api_token
      t.integer :user_id
      t.timestamps
    end
  end
end
