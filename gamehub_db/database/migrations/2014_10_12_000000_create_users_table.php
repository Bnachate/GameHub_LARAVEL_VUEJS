<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('adress_invoice')->nullable();;
            $table->rememberToken();
            $table->timestamps();
            $table->integer('admin')->default(0);
            $table->string('password_confirm');
            $table->integer('phone_number')->nullable();
            $table->integer('post_code_invoice')->nullable();
            $table->string('city_invoice')->nullable();
            $table->string('adress_delivery')->nullable();
            $table->integer('post_code_delivery')->nullable();
            $table->string('city_delivery')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
