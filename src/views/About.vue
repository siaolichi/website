<template>
	<div id="about-page">
		<h1>About</h1>
		<p>
			Li-Chi Hsiao is a multidisciplinary artist making sound installations and live
			performances. Using self-made interfaces, her works take on a variety of forms such as
			Audio-Visual, sound, installations and live performances. Since 2011, she collaborated
			with sound artist Iang Tu and Chang Yen-Tzu and began to incorporate visual aspects into
			her work. Her installations create a transfer from body to the visual domain. In 2013,
			she began to create audiovisual live performances. In her work she often is questioning
			the relationship between audience and performer, people and herself. Currently, she is
			attending the program of Art and Media at Berlin University of Art. Her practice focuses
			on creating possibilities to connect the performer with the audience through a live
			performance.
		</p>
		<b>Award / Exhibition</b>
		<ul>
			<li class="year">2013</li>
			<li>
				National Palace Museum, Qianlong C.H.A.O. New Media Art , interactive installation
			</li>
		</ul>
		<ul>
			<li class="year">2013</li>
			<li>Digital Art Festival Taipei</li>
		</ul>
		<ul>
			<li class="year">2014</li>
			<li>The 12th Taoyuan Creation Award</li>
		</ul>
		<ul>
			<li class="year">2017</li>
			<li>Cooperation project 'Diaspora', Asia contemporary art platform NON Berlin</li>
		</ul>
		<ul>
			<li class="year">2019</li>
			<li>
				PANORAMA Shenzhen New Media Art Festival, Cutural Center Exhibition Gallery, Shenzen
			</li>
		</ul>
		<ul>
			<li class="year">2019</li>
			<li>
				Beyond Gender, Factory Berlin, Germany
			</li>
		</ul>
		<ul>
			<li class="year">2019</li>
			<li>
				Asia Now, Asian Art Fair, Paris, France
			</li>
		</ul>
		<b>Performance</b>
		<ul>
			<li class="year">2012</li>
			<li>Lacking sound Festival Listen 63 , Taipei</li>
		</ul>
		<ul>
			<li class="year">2013</li>
			<li>Kangding Ray Live In Taipei After Party, Korner, Taipei</li>
		</ul>
		<ul>
			<li class="year">2013</li>
			<li>Linux Audio Conference, Graz, Austria</li>
		</ul>
		<ul>
			<li class="year">2014</li>
			<li>
				(0,0,0,0) exhibiton opening performance, Taipei 2014 Lacking sound Festival Listen
				68 , Taipei
			</li>
		</ul>
		<ul>
			<li class="year">2015</li>
			<li>Chaning, Ausland, Berlin</li>
		</ul>
		<ul>
			<li class="year">2016</li>
			<li>0ff2n0ff, Tresor Linz, Linz</li>
		</ul>
		<ul>
			<li class="year">2017</li>
			<li>Emitter Micro, Ausland, Berlin</li>
		</ul>
	</div>
</template>
<script>
export default {
	mounted() {
		console.log('mounted');
		this.$store.commit('setDocReady', true);
	}
};
</script>
<style lang="scss" scoped>
#about-page {
	font-size: 14px;
	display: block;
	text-align: justify;
	width: 50%;
	margin: 0 auto;
	margin-top: 80px;
	line-height: 1.5em;
	ul {
		list-style-type: none;
	}
	li {
		display: inline-block;
		width: 80%;
		vertical-align: top;
	}
	.year {
		width: 50px;
		font-weight: bold;
	}
}
@media only screen and (max-width: 600px) {
	#about-page {
		width: 90%;
		padding: 0;
	}
	li,
	ul {
		padding: 0;
	}
}
</style>
