class CreateJogs < ActiveRecord::Migration
  def change
    create_table :jogs do |t|
      t.integer :user_id
      t.datetime :start_time
      t.decimal :distance_in_miles
      t.decimal :time_in_hours

      t.timestamps
    end
  end
end
