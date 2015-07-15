class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.text :image_url
    end
  end
end
