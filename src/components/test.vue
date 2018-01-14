

<template class="theme--dark">
   <v-app id="inspire" :style=" { 'background-color': bgColor }">
      <v-toolbar class="theme--dark">
         <v-toolbar-title class="white--text">CryptoVue</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn icon>
            <v-icon>search</v-icon>
         </v-btn>
      </v-toolbar>
     <!--  <v-layout>
         <v-flex xs6 sm6 offset-sm3>
            <v-card>
               <v-card-title style="background-color: #34D6D8; color: white">
                  <div>
                    <span class="headline"> Statistics</span><br>
                     <span class="grey--text">Total Market Cap:</span><span> {{ stats.total_market_cap_usd }}$</span><br>
                     <span class="grey--text">Active Currencies:</span><span> {{ stats.active_currencies }}</span><br>
                  </div>
               </v-card-title>
            </v-card>
         </v-flex>
      </v-layout> -->
     <!--  <v-layout row wrap>
         <div v-if="coins && coins.length">
            <v-container v-for="coin of coins">
               <v-flex style="margin-top: 5px;" offset-sm1>
                  <v-card style="background-color: #41458F" class="white--text elevation-3">
                     <v-container fluid grid-list>
                        <v-layout row wrap>
                           <v-flex xs6 sm6>
                              <div>
                                 <div class="headline">
                                    <p><strong><i>{{coin.name}}</i></strong></p>
                                 </div>
                                 <div v-if="e2 == 0">
                                    <p>Price USD: {{  coin.price_usd }}</p>
                                 </div>
                                 <div v-else-if="e2 == 1">
                                    <p>Price BTC: {{  coin.price_btc }}</p>
                                 </div>
                              </div>
                           </v-flex>
                           <v-flex xs4 sm2>
                              <v-card-media
                                 src="http://altcoins.cryptodir.com/media/k2/categories/1.png"
                                 height="125px"
                                 contain
                                 ></v-card-media>
                           </v-flex>
                        </v-layout>
                     </v-container>
                  </v-card>
               </v-flex>
               <v-divider></v-divider>
            </v-container>

         </div>
      </v-layout> -->

      <v-layout row>
      <v-flex lg12>
        <v-bottom-nav
         shift
         :value="true"
         :active.sync="e2"
         :color="computedColor"
         >
         <v-btn dark>
            <span>Values</span>
            <v-icon>attach_money</v-icon>
         </v-btn>
         <v-btn dark>
            <span>Timeline</span>
            <v-icon>timeline</v-icon>
         </v-btn>
         <v-btn dark>
            <span>Exchange</span>
            <v-icon>swap_vert</v-icon>
         </v-btn>
      </v-bottom-nav>
        <v-card v-if="e2 == 0">
          <v-list two-line class="theme--dark">
            <template v-for="(coin, index) in coins">
              <v-list-tile avatar ripple v-bind:key="index" @click="">
                <v-list-tile-content style="color:white !important;">
                  <v-list-tile-title>
                    <v-icon color="teal darken-1">attach_money</v-icon> {{ coin.name }}
                     ( {{ coin.symbol }} )
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                          <v-layout row wrap>
                    <v-flex lg2> <p>Price USD: {{  coin.price_usd }} </p></v-flex>
                    <v-flex lg2> <p>Price BTC: {{  coin.price_btc }} </p></v-flex>
                    <v-flex lg2><p><v-icon v-if="coin.percent_change_24h > 0" color="teal">arrow_upward</v-icon>
                      <v-icon v-else color="red"> arrow_downward</v-icon>  
                    Change 24h: {{  coin.percent_change_24h }}%</p></v-flex>
                    <v-flex lg2><p><v-icon v-if="coin.percent_change_7d > 0" color="teal">arrow_upward</v-icon>
                      <v-icon v-else color="red"> arrow_downward</v-icon>  
                    Change 7d: {{  coin.percent_change_7d }}%</p></v-flex>
                  </v-layout>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>Rank: {{ index+1 }}</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 &lt; coins.length"></v-divider>
            </template>
          </v-list>
        </v-card>
    <v-layout  v-else>
      <v-flex>
                <v-card>
          <v-card-media style="padding0:-20px; margin-top: 20px;">

        <trend
  :data="this.histData"
  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
  auto-draw
  :width="1400" :height="500"
  smooth>
</trend>
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Pulse Graph for Bitcoin</h3>
              <div>This graph shows Bitcoin value over USD in given spesific time.</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
      </v-flex>
    </v-layout>
   </v-app>
</template>
<script>
   import axios from 'axios';
   import jQuery from 'jquery';
   import chartjs from 'chart.js';

   // APIurl = 'http://jsonplaceholder.typicode.com/posts';
   const APIurl  = 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=50';
   const statURL = 'https://api.coinmarketcap.com/v1/global/';
   const BTCHist = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2015-09-01&end=';
   const BTCAll = 'https://api.coindesk.com/v1/bpi/historical/close.json';
   export default {
   data() {
   return {
   coins: [],
   stats: [],
   histData: [],
   ctx: document.getElementById('GraphArea'),
   bgColor: '#424242',//'#21253d',
   e2: 0
   }
   },
   computed: {
   computedColor () {
   switch (this.e2) {
   case 0:
   return 'teal'
   break
   case 1:
   return 'green'
   break
   case 2:
   return 'amber'
   break
   case 3:
   return 'indigo'
   break
   }
   },
   computeRise (changeVal) {
    if(changeVal > 0)
      true;
    else
      false;
   }
   },
   created() {
   axios.get(APIurl)
   .then(response => {
   // JSON responses are automatically parsed.
   this.coins = response.data
   });

   axios.get(statURL)
   .then(response => {
   // JSON responses are automatically parsed.
   this.stats = response.data
   });

   var a = new Date();
   var todayDate = a.getFullYear() + '-';
   var tmp = (a.getMonth()+1);
   if(tmp < 10) tmp = '0' +tmp + '-'; 
   todayDate +=  tmp; 
   tmp = a.getDate();
   if(tmp < 10) tmp = '0' +tmp + '-'; 
   todayDate +=  tmp; 

axios.get(BTCHist+todayDate)
   .then(response => {
   var respData = response.data;
               var array = Object.values(respData.bpi);
               this.histData = array;
   });
   }
   }
</script>

