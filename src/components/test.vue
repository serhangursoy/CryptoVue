

<template class="theme--dark">
   <v-app id="inspire" :style=" { 'background-color': bgColor }">
      <v-toolbar class="theme--dark" style="background-color: #2D2F5F">
         <v-toolbar-title class="white--text">CryptoVue</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn icon>
            
         </v-btn>
      </v-toolbar>
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
                  <span>News</span>
                  <v-icon>chrome_reader_mode</v-icon>
               </v-btn>
            </v-bottom-nav>
            <v-card v-if="e2 == 0">
               <v-list two-line class="theme--dark" style="background-color: #383A6B; color: white; margin-bottom: 40px">
                  <template v-for="(coin, index) in coins">
                     <v-list-tile avatar ripple v-bind:key="index" @click="">
                        <v-list-tile-content style="color:white !important; font-style: bold">
                           <v-list-tile-title>
                              <v-icon color="teal darken-1">attach_money</v-icon>
                              {{ coin.name }}
                              ( {{ coin.symbol }} )
                           </v-list-tile-title>
                           <v-list-tile-sub-title>
                              <v-layout row wrap>
                                 <v-flex lg2>
                                    <p>Price USD: {{  coin.price_usd }} </p>
                                 </v-flex>
                                 <v-flex lg2>
                                    <p>Price BTC: {{  coin.price_btc }} </p>
                                 </v-flex>
                                 <v-flex lg2>
                                    <p>
                                       <v-icon v-if="coin.percent_change_24h > 0" color="teal">arrow_upward</v-icon>
                                       <v-icon v-else color="red"> arrow_downward</v-icon>
                                       Change 24h: {{  coin.percent_change_24h }}%
                                    </p>
                                 </v-flex>
                                 <v-flex lg2>
                                    <p>
                                       <v-icon v-if="coin.percent_change_7d > 0" color="teal">arrow_upward</v-icon>
                                       <v-icon v-else color="red"> arrow_downward</v-icon>
                                       Change 7d: {{  coin.percent_change_7d }}%
                                    </p>
                                 </v-flex>
                              </v-layout>
                           </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                           <v-list-tile-action-text>Rank: {{ index+1 }}</v-list-tile-action-text>
                        </v-list-tile-action>
                     </v-list-tile>
                     <v-divider v-if="index + 1 &lt; coins.length"></v-divider>
                  </template>
               </v-list>
            </v-card>
            <v-layout  v-else-if=" e2 == 1" style="margin-top: 20px;">
               <v-flex lg11 style="margin-left: 3.4%">
                  <v-card class="theme--dark" style="background-color: transparent">
                     <v-alert
                        color="error"
                        icon="error"
                        :value="errorMessage"
                        transition="scale-transition"
                        dismissible
                        v-model="errorMessage"
                        >
                        End date should be before than start date! Check them before sending request!
                     </v-alert>
                     <v-card-media style="padding:-20px;background-color: rgba(150,150,250,0.1) !important;">
                        <trend
                           :data="this.histData"
                           :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                           auto-draw
                           :stroke-width="5"
                           :width="this.sWidth" :height="550"
                           smooth></trend>
                     </v-card-media>
                     <v-card-title primary-title style="background-color: #3B3E73">
                        <div>
                           <h3 class="headline mb-0">Pulse Graph for Bitcoin</h3>
                           <div>This graph shows Bitcoin's value over USD in given spesific time range. Please pick a starting date to see pulse graph.</div>
                        </div>
                        <v-flex xsl style="width: 10%; margin-left: 20px;">
                           <v-menu
                              lazy
                              :close-on-content-click="false"
                              v-model="menu"
                              transition="scale-transition"
                              offset-y
                              full-width
                              :nudge-right="-40"
                              max-width="290px"
                              min-width="290px"
                              color="teal darken-3"
                              >
                              <v-text-field
                                 slot="activator"
                                 label="Start Date"
                                 v-model="date"
                                 prepend-icon="event"
                                 readonly
                                 max-width="50px"
                                 min-width="10px"
                                 color="teal darken-3"
                                 ></v-text-field>
                              <v-date-picker type="month" v-model="date" no-title scrollable actions color="teal darken-2">
                                 <template slot-scope="{ save, cancel }">
                                    <v-card-actions>
                                       <v-spacer></v-spacer>
                                       <v-btn flat color="teal darken-3" @click="cancel">Cancel</v-btn>
                                       <v-btn flat color="teal darken-3" @click="save" v-on:click="changeStartdate">OK</v-btn>
                                    </v-card-actions>
                                 </template>
                              </v-date-picker>
                           </v-menu>
                        </v-flex>
                        <v-flex xsl style="width: 10%; margin-left: 20px;">
                           <v-menu
                              lazy
                              :close-on-content-click="false"
                              v-model="menu2"
                              transition="scale-transition"
                              offset-y
                              full-width
                              :nudge-right="-40"
                              max-width="290px"
                              min-width="290px"
                              color="teal darken-3"
                              >
                              <v-text-field
                                 v-on:change="changeStartdate"
                                 slot="activator"
                                 label="End Date"
                                 v-model="date2"
                                 prepend-icon="event"
                                 readonly
                                 color="teal darken-3"
                                 ></v-text-field>
                              <v-date-picker type="month" v-model="date2" no-title scrollable actions color="teal darken-2">
                                 <template slot-scope="{ save, cancel }">
                                    <v-card-actions>
                                       <v-spacer></v-spacer>
                                       <v-btn flat color="teal darken-3" @click="cancel">Cancel</v-btn>
                                       <v-btn flat color="teal darken-3" @click="save" v-on:click="changeStartdate">OK</v-btn>
                                    </v-card-actions>
                                 </template>
                              </v-date-picker>
                           </v-menu>
                        </v-flex>
                        <v-flex>
                           <v-btn
                              color="indigo lighten-2"
                              :loading="loading"
                              @click.native="loader = 'loading'"
                              :disabled="loading"
                              >
                              Show
                           </v-btn>
                        </v-flex>
                     </v-card-title>
                  </v-card>
               </v-flex>
            </v-layout>
            <v-layout v-else style="background-color: rgb(14, 0, 69)">
            <v-flex xs8 offset-md2 style="margin-bottom: 50px;" color="light-green darken-3">
            <v-card v-for="(article, index) in newsData" v-bind:key="index" class="white--text" style="margin-top: 20px;background-color: rgb(43, 30, 95)" elevation-18>
          <v-card-media v-if="article.data.preview != null" :src="article.data.preview.images[0].source.url" height="200px">
          </v-card-media>
        <v-card-media v-else src="https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2017/11/09095924/cryptocurrency-cannabis-1280x800.jpg" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline"> {{ article.data.title }}</h3>
              <v-list-tile-action-text> {{  timeConverter(article.data.created) }}</v-list-tile-action-text>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn :href="article.data.url" target="_blank" color="amber lighten-3">Read the full article</v-btn>
          </v-card-actions>
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

   const APIurl  = 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=50';
   const statURL = 'https://api.coinmarketcap.com/v1/global/';
   var startDate = '2013-09-01';
   const BTCHist = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + startDate + '&end=';
   const BTCAll = 'https://api.coindesk.com/v1/bpi/historical/close.json';
   const preURL = 'https://coinbin.org/btc/forecast';
   const newsURL = 'https://www.reddit.com/search.json?q=cryptocoin&sort=new';
   const newsURL2 = 'https://www.reddit.com/search.json?q=bitcoin&sort=new';
   var a = new Date();
   var todayDateVar = a.getFullYear() + '-';
   var tmp = (a.getMonth()+1);
   if(tmp < 10) tmp = '0' +tmp + '-';
   todayDateVar +=  tmp;
   tmp = a.getDate();
   if(tmp < 10) tmp = '0' +tmp + '-';
   todayDateVar +=  tmp;
   const todayDate = todayDateVar;

  
   export default {
   data() {
   return {
   loader: null,
   sWidth: 100,
   loading: false,
   date: startDate,
   menu: false,
   modal: false,
   date2: todayDate,
   errorMessage: false,
   menu2: false,
   modal2: false,
   coins: [],
   stats: [],
   histData: [],
   predData: [],
   newsData: [],
   ctx: document.getElementById('GraphArea'),
   bgColor: '#383A6B',//'#424242',//'#21253d',
   graphDown: '#3B3E73',
   e2: 0
   }
   },
   methods: {
   changeStartdate: function(event) {
   console.log(this.date);
   },
   timeConverter: function(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
  return time;
},

fetchData: function() {
  axios.get(APIurl)
   .then(response => {
   this.coins = response.data;
   console.log("Im here");
   });
}
   },

   mounted: function() {
     this.fetchData();

    setInterval(function () {
      this.fetchData();
    }.bind(this), 150000); 
   },
   watch: {
   loader () {
   const l = this.loader
   this[l] = !this[l]
   startDate = this.date + '-01';
   if (startDate < todayDate) {
   axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + startDate + '&end=' + todayDate)
   .then(response => {
   var respData = response.data;
   var array = Object.values(respData.bpi);
   this.histData = array;
   });
   } else {
   this.errorMessage = true;
   }
   setTimeout(() => (this[l] = false), 100)
   
   this.loader = null
   }
   },
   computed: {
   computedColor () {
   switch (this.e2) {
   case 0:
   return 'cyan darken-3'
   break
   case 1:
   return 'teal darken-2'
   break
   case 2:
   return 'indigo darken-2'
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
    window.addEventListener('mousemove',this.move);
    this.sWidth = 7*window.innerWidth/8;
 
   axios.get(statURL)
   .then(response => {
   this.stats = response.data
   });
  
   axios.get(BTCHist+todayDate)
   .then(response => {
   var respData = response.data;
   var array = Object.values(respData.bpi);
   this.histData = array;
   });


   axios.get(newsURL)
   .then(response => {
   this.newsData = response.data.data.children;
   }).catch(function (error) {
               console.log( error);
               
           });

axios.get(APIurl)
   .then(response => {
   this.coins = response.data
   });
   axios.get(newsURL2)
   .then(response => {
   this.newsData = (this.newsData).concat(response.data.data.children);
   }).catch(function (error) {
               console.log( error);
               
           });

/*
   var fetchedJSON = $.getJSON(preURL, function( data ) {
    console.log(data);
   var array = Object.values(data);
   this.predData = array;
   console.log(this.predData);
  console.log( "success" );
}).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("error " + textStatus);
        console.log("incoming Text " + jqXHR.responseText);
    });
*/
   
   }
   }



</script>
