package com.example.music;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.PorterDuff;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

import java.io.File;
import java.util.ArrayList;
import java.util.Random;



public class PlayerActivity extends AppCompatActivity {
    Button btn_next, btn_pause, btn_previous, btn_repeat, btn_suffel;
    TextView songTextLabel ;
    SeekBar songSeekbar;
    static boolean repeatBoolean=false, suffelBoolean=false;



    static MediaPlayer myMediaPlayer;
    int position;
    String sname;
    ArrayList<File> mySongs;
    Thread updateseekBar;


    @SuppressLint("NewApi")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_player);

        btn_next = (Button)findViewById(R.id.next);
        btn_previous =(Button)findViewById(R.id.previous);
        btn_pause =(Button)findViewById(R.id.pause);
        btn_repeat=(Button)findViewById(R.id.repeat_on);

        btn_suffel=(Button)findViewById(R.id.suffel);



        songTextLabel = (TextView)findViewById(R.id.SongLable);
        songSeekbar = (SeekBar)findViewById(R.id.seekBar);

        updateseekBar= new Thread(){

             @Override
            public void run(){

                 int totalDuration = myMediaPlayer.getDuration();
                 int currentPosition = 0;

                 while (currentPosition<totalDuration){
                     try {
                         sleep(500);
                         currentPosition= myMediaPlayer.getCurrentPosition();
                         songSeekbar.setProgress(currentPosition);

                     }
                     catch (InterruptedException e){
                         e.printStackTrace();

                     }
                 }


             }
        };

        if (myMediaPlayer!=null){

            myMediaPlayer.stop();
            myMediaPlayer.release();
        }
        Intent i = getIntent();
        Bundle bundle = i.getExtras();

        mySongs= (ArrayList) bundle.getParcelableArrayList("songs");

        sname = mySongs.get(position).getName().toString();

        String songName = i.getStringExtra("songname");

        songTextLabel.setText(songName);
        songTextLabel.setSelected(true);


        position = bundle.getInt("pos",0);

        Uri u= Uri.parse(mySongs.get(position).toString());

        myMediaPlayer= myMediaPlayer.create(getApplicationContext(),u);

        myMediaPlayer.start();
        songSeekbar.setMax(myMediaPlayer.getDuration());

        updateseekBar.start();

        songSeekbar.getProgressDrawable().setColorFilter(getResources().getColor(R.color.colorPrimary), PorterDuff.Mode.MULTIPLY);
        songSeekbar.getThumb().setColorFilter(getResources().getColor(R.color.colorPrimary), PorterDuff.Mode.SRC_IN);

        songSeekbar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

                myMediaPlayer.seekTo(seekBar.getProgress());
            }
        });



        btn_pause.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                songSeekbar.setMax(myMediaPlayer.getDuration());

                if (myMediaPlayer.isPlaying()){

                    btn_pause.setBackgroundResource(R.drawable.icon_play);
                    myMediaPlayer.pause();
                }
                else {

                    btn_pause.setBackgroundResource(R.drawable.icon_pause );
                    myMediaPlayer.start();
                }

            }
        });

        btn_next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {



                myMediaPlayer.stop();
                myMediaPlayer.release();
                if (suffelBoolean&&!repeatBoolean){
                    position=getRandom(mySongs.size()-1);
                }
                else if (!suffelBoolean && !repeatBoolean){
                    position =((position+1)%mySongs.size());
                }


                Uri u = Uri.parse(mySongs.get(position).toString());

                myMediaPlayer= MediaPlayer.create(getApplicationContext(),u);

                sname = mySongs.get(position).getName().toString();
                songTextLabel.setText(sname);

                myMediaPlayer.start();
            }

            private int getRandom(int i) {
                Random random=new Random();
                return random.nextInt(i+1);
            }
        });

        btn_previous.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                myMediaPlayer.stop();
                myMediaPlayer.release();

                if (suffelBoolean&&!repeatBoolean){
                    position=getRandom(mySongs.size()-1);
                }
                else if (!suffelBoolean && !repeatBoolean){
                    position=((position-1)<0)? (mySongs.size()-1):(position-1);

                }



                Uri u = Uri.parse(mySongs.get(position).toString());

                myMediaPlayer =MediaPlayer.create(getApplicationContext(),u);

                sname = mySongs.get(position).getName().toString();
                songTextLabel.setText(sname);

                myMediaPlayer.start();
            }

            private int getRandom(int i) {
                Random random= new Random();
                return random.nextInt(i-1);
            }
        });

        btn_repeat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (repeatBoolean){
                    repeatBoolean=false;
                    btn_repeat.setBackgroundResource(R.id.repeat_off);
                }
                else {
                    repeatBoolean=true;
                    btn_repeat.setBackgroundResource(R.id.repeat_on);

                }

            }
        });

        btn_suffel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (suffelBoolean){
                    suffelBoolean=false;
                    btn_suffel.setBackgroundResource(R.id.repeat_off);
                    myMediaPlayer.isLooping();
                }
                else {
                    suffelBoolean=true;
                    btn_suffel.setBackgroundResource(R.id.repeat_on);
                }

            }
        });



    }
}