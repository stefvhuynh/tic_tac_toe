class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.integer :wins, null: false
      t.integer :losses, null: false
      t.integer :draws, null: false

      t.timestamps null: false
    end

    add_index :users, :username, unique: true
  end
end
