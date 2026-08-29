import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function BanyanLivingMark({
  title,
  className,
  ...props
}: Props) {
  const maskId = "banyan-leaf-mask";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 168 120"
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(0,4) scale(0.53)">
      <defs>
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="300" height="250">
      <rect x="0" y="0" width="300" height="250" fill="#fff"/>
      <ellipse cx="138" cy="50" rx="2" ry="1" fill="#000" transform="rotate(-97 138 50)"/>
      <ellipse cx="75" cy="81" rx="2" ry="1" fill="#000" transform="rotate(-205 75 81)"/>
      <ellipse cx="119" cy="94" rx="3" ry="1" fill="#000" transform="rotate(139 119 94)"/>
      <ellipse cx="176" cy="62" rx="2" ry="1" fill="#000" transform="rotate(-32 176 62)"/>
      <ellipse cx="39" cy="83" rx="3" ry="1" fill="#000" transform="rotate(-185 39 83)"/>
      <ellipse cx="85" cy="86" rx="4" ry="1" fill="#000" transform="rotate(198 85 86)"/>
      <ellipse cx="98" cy="54" rx="4" ry="1" fill="#000" transform="rotate(-124 98 54)"/>
      <ellipse cx="149" cy="100" rx="3" ry="1" fill="#000" transform="rotate(73 149 100)"/>
      <ellipse cx="129" cy="63" rx="2" ry="1" fill="#000" transform="rotate(-156 129 63)"/>
      <ellipse cx="205" cy="92" rx="3" ry="1" fill="#000" transform="rotate(21 205 92)"/>
      <ellipse cx="62" cy="84" rx="4" ry="1" fill="#000" transform="rotate(-166 62 84)"/>
      <ellipse cx="136" cy="40" rx="4" ry="1" fill="#000" transform="rotate(-100 136 40)"/>
      <ellipse cx="203" cy="86" rx="2" ry="1" fill="#000" transform="rotate(1 203 86)"/>
      <ellipse cx="220" cy="96" rx="2" ry="1" fill="#000" transform="rotate(7 220 96)"/>
      <ellipse cx="227" cy="100" rx="3" ry="1" fill="#000" transform="rotate(15 227 100)"/>
      <ellipse cx="219" cy="98" rx="3" ry="2" fill="#000" transform="rotate(-14 219 98)"/>
      <ellipse cx="106" cy="95" rx="3" ry="1" fill="#000" transform="rotate(161 106 95)"/>
      <ellipse cx="143" cy="42" rx="4" ry="1" fill="#000" transform="rotate(-97 143 42)"/>
      <ellipse cx="249" cy="75" rx="4" ry="1" fill="#000" transform="rotate(4 249 75)"/>
      <ellipse cx="157" cy="66" rx="3" ry="1" fill="#000" transform="rotate(-70 157 66)"/>
      <ellipse cx="80" cy="54" rx="2" ry="1" fill="#000" transform="rotate(-153 80 54)"/>
      <ellipse cx="76" cy="101" rx="4" ry="1" fill="#000" transform="rotate(158 76 101)"/>
      <ellipse cx="156" cy="104" rx="3" ry="1" fill="#000" transform="rotate(96 156 104)"/>
      <ellipse cx="205" cy="100" rx="3" ry="1" fill="#000" transform="rotate(19 205 100)"/>
      <ellipse cx="87" cy="50" rx="3" ry="1" fill="#000" transform="rotate(-124 87 50)"/>
      <ellipse cx="157" cy="99" rx="2" ry="1" fill="#000" transform="rotate(48 157 99)"/>
      <ellipse cx="209" cy="102" rx="4" ry="1" fill="#000" transform="rotate(45 209 102)"/>
      <ellipse cx="224" cy="64" rx="2" ry="1" fill="#000" transform="rotate(6 224 64)"/>
      <ellipse cx="203" cy="56" rx="4" ry="1" fill="#000" transform="rotate(-17 203 56)"/>
      <ellipse cx="137" cy="104" rx="3" ry="1" fill="#000" transform="rotate(110 137 104)"/>
      <ellipse cx="111" cy="84" rx="3" ry="1" fill="#000" transform="rotate(-186 111 84)"/>
      <ellipse cx="243" cy="91" rx="3" ry="1" fill="#000" transform="rotate(14 243 91)"/>
      <ellipse cx="66" cy="61" rx="3" ry="1" fill="#000" transform="rotate(-153 66 61)"/>
      <ellipse cx="173" cy="45" rx="3" ry="1" fill="#000" transform="rotate(-77 173 45)"/>
      <ellipse cx="76" cy="101" rx="3" ry="1" fill="#000" transform="rotate(165 76 101)"/>
      <ellipse cx="234" cy="82" rx="3" ry="1" fill="#000" transform="rotate(-24 234 82)"/>
      <ellipse cx="254" cy="73" rx="3" ry="1" fill="#000" transform="rotate(-1 254 73)"/>
      <ellipse cx="200" cy="81" rx="3" ry="1" fill="#000" transform="rotate(-24 200 81)"/>
      <ellipse cx="254" cy="78" rx="3" ry="1" fill="#000" transform="rotate(-22 254 78)"/>
      <ellipse cx="149" cy="108" rx="4" ry="2" fill="#000" transform="rotate(16 149 108)"/>
      <ellipse cx="221" cy="80" rx="4" ry="1" fill="#000" transform="rotate(88 221 80)"/>
      <ellipse cx="160" cy="66" rx="5" ry="2" fill="#000" transform="rotate(42 160 66)"/>
      <ellipse cx="111" cy="94" rx="4" ry="2" fill="#000" transform="rotate(137 111 94)"/>
      <ellipse cx="188" cy="94" rx="4" ry="2" fill="#000" transform="rotate(129 188 94)"/>
      <ellipse cx="148" cy="90" rx="5" ry="1" fill="#000" transform="rotate(14 148 90)"/>
      <ellipse cx="92" cy="87" rx="4" ry="2" fill="#000" transform="rotate(35 92 87)"/>
      <ellipse cx="82" cy="69" rx="5" ry="2" fill="#000" transform="rotate(46 82 69)"/>
      </mask>
      </defs>
      <g fill="currentColor" stroke="none" mask={`url(#${maskId})`}>
      <path d="M16,84 L15,80 L15,77 L17,73 L20,70 L24,67 L28,63 L31,60 L32,56 L33,52 L36,49 L41,46 L49,44 L58,43 L67,42 L75,41 L82,40 L88,38 L94,36 L100,35 L107,34 L114,33 L121,32 L128,30 L135,28 L142,26 L150,24 L158,23 L166,24 L174,26 L181,28 L188,30 L195,31 L204,31 L212,31 L220,32 L228,34 L234,36 L240,38 L247,41 L254,43 L261,45 L267,48 L270,52 L270,56 L268,60 L266,64 L265,68 L267,71 L270,74 L273,77 L275,81 L276,84 L280,109 L269,110 L258,112 L248,113 L237,113 L226,112 L215,111 L204,109 L193,107 L182,105 L172,103 L161,102 L150,101 L139,101 L128,102 L118,103 L107,105 L96,107 L85,110 L74,111 L63,112 L52,113 L42,113 L31,112 L20,110 Z"/>
      <circle cx="24" cy="63" r="6"/>
      <circle cx="27" cy="66" r="6"/>
      <circle cx="153" cy="30" r="3"/>
      <circle cx="32" cy="53" r="6"/>
      <circle cx="231" cy="50" r="6"/>
      <circle cx="54" cy="44" r="5"/>
      <circle cx="80" cy="31" r="6"/>
      <circle cx="65" cy="31" r="3"/>
      <circle cx="69" cy="28" r="4"/>
      <circle cx="242" cy="44" r="3"/>
      <circle cx="64" cy="45" r="4"/>
      <circle cx="44" cy="52" r="5"/>
      <circle cx="232" cy="48" r="4"/>
      <circle cx="127" cy="25" r="5"/>
      <circle cx="86" cy="24" r="2"/>
      <circle cx="82" cy="29" r="4"/>
      <circle cx="168" cy="26" r="4"/>
      <circle cx="24" cy="67" r="4"/>
      <circle cx="244" cy="46" r="5"/>
      <circle cx="36" cy="71" r="6"/>
      <circle cx="183" cy="24" r="2"/>
      <circle cx="239" cy="51" r="2"/>
      <circle cx="185" cy="32" r="4"/>
      <circle cx="130" cy="23" r="3"/>
      <circle cx="50" cy="51" r="6"/>
      <circle cx="165" cy="34" r="2"/>
      <circle cx="185" cy="31" r="6"/>
      <circle cx="27" cy="68" r="4"/>
      <circle cx="112" cy="29" r="5"/>
      <circle cx="274" cy="68" r="6"/>
      <circle cx="54" cy="36" r="5"/>
      <circle cx="132" cy="33" r="4"/>
      <circle cx="36" cy="54" r="3"/>
      <circle cx="69" cy="35" r="5"/>
      <circle cx="203" cy="29" r="4"/>
      <circle cx="149" cy="25" r="5"/>
      <circle cx="114" cy="24" r="3"/>
      <circle cx="278" cy="65" r="5"/>
      <circle cx="84" cy="30" r="4"/>
      <circle cx="216" cy="43" r="5"/>
      <circle cx="141" cy="29" r="6"/>
      <circle cx="29" cy="61" r="5"/>
      <circle cx="200" cy="34" r="6"/>
      <circle cx="43" cy="63" r="6"/>
      <circle cx="275" cy="60" r="3"/>
      <circle cx="129" cy="32" r="5"/>
      <circle cx="272" cy="59" r="5"/>
      <circle cx="240" cy="48" r="5"/>
      <circle cx="162" cy="26" r="4"/>
      <circle cx="281" cy="67" r="6"/>
      <circle cx="289" cy="82" r="5"/>
      <circle cx="35" cy="73" r="2"/>
      <circle cx="90" cy="24" r="5"/>
      <circle cx="291" cy="60" r="2"/>
      <circle cx="96" cy="31" r="6"/>
      <circle cx="145" cy="29" r="4"/>
      <circle cx="78" cy="24" r="2"/>
      <circle cx="148" cy="30" r="4"/>
      <circle cx="75" cy="30" r="2"/>
      <circle cx="36" cy="82" r="6"/>
      <circle cx="222" cy="37" r="4"/>
      <circle cx="27" cy="58" r="5"/>
      <circle cx="71" cy="30" r="2"/>
      <circle cx="73" cy="29" r="3"/>
      <circle cx="42" cy="64" r="6"/>
      <circle cx="254" cy="53" r="3"/>
      <circle cx="62" cy="47" r="6"/>
      <circle cx="37" cy="67" r="5"/>
      <circle cx="140" cy="32" r="5"/>
      <circle cx="223" cy="39" r="5"/>
      <circle cx="218" cy="41" r="4"/>
      <circle cx="41" cy="47" r="6"/>
      <circle cx="140" cy="24" r="6"/>
      <circle cx="183" cy="33" r="4"/>
      <circle cx="277" cy="58" r="6"/>
      <circle cx="275" cy="75" r="5"/>
      <circle cx="64" cy="32" r="4"/>
      <circle cx="186" cy="34" r="6"/>
      <circle cx="14" cy="77" r="3"/>
      <circle cx="26" cy="59" r="3"/>
      <circle cx="174" cy="33" r="3"/>
      <circle cx="275" cy="58" r="6"/>
      <circle cx="236" cy="48" r="6"/>
      <circle cx="123" cy="32" r="2"/>
      <circle cx="63" cy="38" r="5"/>
      <circle cx="27" cy="81" r="6"/>
      <circle cx="43" cy="58" r="6"/>
      <circle cx="59" cy="46" r="4"/>
      <circle cx="276" cy="65" r="4"/>
      <circle cx="280" cy="72" r="4"/>
      <circle cx="236" cy="49" r="3"/>
      <circle cx="284" cy="83" r="5"/>
      <circle cx="74" cy="31" r="3"/>
      <circle cx="215" cy="41" r="6"/>
      <circle cx="212" cy="32" r="6"/>
      <circle cx="134" cy="29" r="5"/>
      <circle cx="231" cy="43" r="3"/>
      <circle cx="58" cy="38" r="6"/>
      <circle cx="35" cy="61" r="4"/>
      <circle cx="186" cy="30" r="5"/>
      <circle cx="216" cy="40" r="5"/>
      <circle cx="282" cy="79" r="3"/>
      <circle cx="31" cy="62" r="4"/>
      <circle cx="39" cy="62" r="5"/>
      <circle cx="155" cy="26" r="4"/>
      <circle cx="122" cy="24" r="6"/>
      <circle cx="31" cy="74" r="4"/>
      <circle cx="155" cy="25" r="5"/>
      <circle cx="264" cy="59" r="6"/>
      <circle cx="179" cy="24" r="6"/>
      <circle cx="123" cy="24" r="5"/>
      <circle cx="288" cy="75" r="5"/>
      <circle cx="43" cy="50" r="2"/>
      <circle cx="137" cy="28" r="3"/>
      <circle cx="216" cy="40" r="3"/>
      <circle cx="109" cy="112" r="4"/>
      <circle cx="35" cy="105" r="4"/>
      <circle cx="43" cy="105" r="5"/>
      <circle cx="41" cy="104" r="2"/>
      <circle cx="27" cy="101" r="3"/>
      <circle cx="177" cy="106" r="3"/>
      <circle cx="214" cy="99" r="5"/>
      <circle cx="40" cy="99" r="5"/>
      <circle cx="25" cy="101" r="3"/>
      <circle cx="168" cy="113" r="4"/>
      <circle cx="148" cy="109" r="2"/>
      <circle cx="225" cy="101" r="3"/>
      <circle cx="43" cy="102" r="4"/>
      <circle cx="147" cy="111" r="5"/>
      <circle cx="153" cy="115" r="2"/>
      <circle cx="270" cy="109" r="5"/>
      <circle cx="118" cy="114" r="4"/>
      <circle cx="180" cy="108" r="4"/>
      <circle cx="25" cy="103" r="5"/>
      <circle cx="274" cy="104" r="4"/>
      <circle cx="72" cy="103" r="4"/>
      <circle cx="48" cy="99" r="4"/>
      <circle cx="119" cy="112" r="4"/>
      <circle cx="33" cy="106" r="3"/>
      <circle cx="152" cy="110" r="2"/>
      <circle cx="104" cy="110" r="2"/>
      <circle cx="219" cy="99" r="4"/>
      <circle cx="120" cy="114" r="5"/>
      <circle cx="225" cy="105" r="4"/>
      <circle cx="186" cy="107" r="5"/>
      <circle cx="33" cy="101" r="3"/>
      <circle cx="274" cy="105" r="3"/>
      <circle cx="118" cy="114" r="2"/>
      <circle cx="221" cy="99" r="2"/>
      <circle cx="83" cy="102" r="5"/>
      <circle cx="156" cy="113" r="2"/>
      <circle cx="191" cy="107" r="4"/>
      <circle cx="69" cy="101" r="5"/>
      </g>
      <g fill="currentColor" stroke="none">
      <path d="M145,90 L155,90 C157,130 158,162 160,192 L140,192 C142,162 143,130 145,90 Z"/>
      <path d="M146,162 C137,176 128,186 126,192 L139,192 Z"/>
      <path d="M146,162 C142,176 137,186 136,192 L144,192 Z"/>
      <path d="M154,162 C157,176 162,186 163,192 L156,192 Z"/>
      <path d="M154,162 C162,176 170,186 172,192 L160,192 Z"/>
      <path d="M146,162 C133,176 122,186 119,192 L136,192 Z"/>
      <path d="M154,162 C166,176 177,186 180,192 L164,192 Z"/>
      </g>
      <g stroke="currentColor" fill="none">
      <line x1="150" y1="101" x2="150" y2="67" stroke-width="9" stroke-linecap="round"/>
      <line x1="150" y1="67" x2="139" y2="45" stroke-width="6" stroke-linecap="round"/>
      <line x1="139" y1="45" x2="123" y2="35" stroke-width="3" stroke-linecap="round"/>
      <line x1="123" y1="35" x2="108" y2="35" stroke-width="2" stroke-linecap="round"/>
      <line x1="108" y1="35" x2="99" y2="40" stroke-width="1" stroke-linecap="round"/>
      <line x1="99" y1="40" x2="94" y2="46" stroke-width="1" stroke-linecap="round"/>
      <line x1="99" y1="40" x2="91" y2="41" stroke-width="1" stroke-linecap="round"/>
      <line x1="108" y1="35" x2="106" y2="35" stroke-width="1" stroke-linecap="round"/>
      <line x1="106" y1="35" x2="100" y2="36" stroke-width="1" stroke-linecap="round"/>
      <line x1="106" y1="35" x2="109" y2="35" stroke-width="1" stroke-linecap="round"/>
      <line x1="123" y1="35" x2="122" y2="33" stroke-width="2" stroke-linecap="round"/>
      <line x1="122" y1="33" x2="119" y2="34" stroke-width="1" stroke-linecap="round"/>
      <line x1="119" y1="34" x2="114" y2="34" stroke-width="1" stroke-linecap="round"/>
      <line x1="119" y1="34" x2="119" y2="33" stroke-width="1" stroke-linecap="round"/>
      <line x1="122" y1="33" x2="127" y2="33" stroke-width="1" stroke-linecap="round"/>
      <line x1="127" y1="33" x2="126" y2="33" stroke-width="1" stroke-linecap="round"/>
      <line x1="127" y1="33" x2="133" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="139" y1="45" x2="145" y2="32" stroke-width="3" stroke-linecap="round"/>
      <line x1="145" y1="32" x2="142" y2="32" stroke-width="2" stroke-linecap="round"/>
      <line x1="142" y1="32" x2="137" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="137" y1="32" x2="131" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="137" y1="32" x2="138" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="142" y1="32" x2="144" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="144" y1="32" x2="142" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="144" y1="32" x2="148" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="145" y1="32" x2="155" y2="32" stroke-width="2" stroke-linecap="round"/>
      <line x1="155" y1="32" x2="158" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="158" y1="32" x2="157" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="158" y1="32" x2="164" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="155" y1="32" x2="165" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="165" y1="32" x2="168" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="165" y1="32" x2="173" y2="34" stroke-width="1" stroke-linecap="round"/>
      <line x1="145" y1="32" x2="147" y2="32" stroke-width="2" stroke-linecap="round"/>
      <line x1="147" y1="32" x2="143" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="147" y1="32" x2="153" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="150" y1="67" x2="165" y2="49" stroke-width="6" stroke-linecap="round"/>
      <line x1="165" y1="49" x2="169" y2="33" stroke-width="3" stroke-linecap="round"/>
      <line x1="169" y1="33" x2="164" y2="32" stroke-width="2" stroke-linecap="round"/>
      <line x1="164" y1="32" x2="158" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="158" y1="32" x2="152" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="158" y1="32" x2="157" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="164" y1="32" x2="164" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="164" y1="32" x2="161" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="164" y1="32" x2="166" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="169" y1="33" x2="172" y2="33" stroke-width="2" stroke-linecap="round"/>
      <line x1="172" y1="33" x2="170" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="170" y1="32" x2="165" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="170" y1="32" x2="172" y2="33" stroke-width="1" stroke-linecap="round"/>
      <line x1="172" y1="33" x2="178" y2="33" stroke-width="1" stroke-linecap="round"/>
      <line x1="178" y1="33" x2="178" y2="33" stroke-width="1" stroke-linecap="round"/>
      <line x1="178" y1="33" x2="185" y2="35" stroke-width="1" stroke-linecap="round"/>
      <line x1="169" y1="33" x2="170" y2="33" stroke-width="2" stroke-linecap="round"/>
      <line x1="170" y1="33" x2="169" y2="32" stroke-width="1" stroke-linecap="round"/>
      <line x1="170" y1="33" x2="174" y2="33" stroke-width="1" stroke-linecap="round"/>
      <line x1="165" y1="49" x2="181" y2="44" stroke-width="3" stroke-linecap="round"/>
      <line x1="181" y1="44" x2="192" y2="35" stroke-width="2" stroke-linecap="round"/>
      <line x1="192" y1="35" x2="188" y2="34" stroke-width="1" stroke-linecap="round"/>
      <line x1="188" y1="34" x2="182" y2="34" stroke-width="1" stroke-linecap="round"/>
      <line x1="188" y1="34" x2="191" y2="35" stroke-width="1" stroke-linecap="round"/>
      <line x1="192" y1="35" x2="197" y2="36" stroke-width="1" stroke-linecap="round"/>
      <line x1="197" y1="36" x2="196" y2="36" stroke-width="1" stroke-linecap="round"/>
      <line x1="197" y1="36" x2="204" y2="37" stroke-width="1" stroke-linecap="round"/>
      <line x1="181" y1="44" x2="194" y2="46" stroke-width="2" stroke-linecap="round"/>
      <line x1="194" y1="46" x2="202" y2="42" stroke-width="1" stroke-linecap="round"/>
      <line x1="202" y1="42" x2="204" y2="37" stroke-width="1" stroke-linecap="round"/>
      <line x1="202" y1="42" x2="209" y2="43" stroke-width="1" stroke-linecap="round"/>
      <line x1="194" y1="46" x2="200" y2="53" stroke-width="1" stroke-linecap="round"/>
      <line x1="200" y1="53" x2="207" y2="55" stroke-width="1" stroke-linecap="round"/>
      <line x1="200" y1="53" x2="201" y2="60" stroke-width="1" stroke-linecap="round"/>
      <line x1="181" y1="44" x2="192" y2="40" stroke-width="2" stroke-linecap="round"/>
      <line x1="192" y1="40" x2="195" y2="35" stroke-width="1" stroke-linecap="round"/>
      <line x1="192" y1="40" x2="199" y2="41" stroke-width="1" stroke-linecap="round"/>
      </g>
      <g stroke="currentColor" fill="none" opacity="0.9">
      <line x1="28" y1="102" x2="29" y2="141" stroke-width="1" stroke-linecap="round"/>
      <line x1="38" y1="101" x2="36" y2="135" stroke-width="1" stroke-linecap="round"/>
      <line x1="47" y1="97" x2="49" y2="127" stroke-width="1" stroke-linecap="round"/>
      <line x1="61" y1="102" x2="60" y2="140" stroke-width="1" stroke-linecap="round"/>
      <line x1="67" y1="105" x2="69" y2="139" stroke-width="1" stroke-linecap="round"/>
      <line x1="80" y1="106" x2="81" y2="158" stroke-width="1" stroke-linecap="round"/>
      <line x1="95" y1="106" x2="94" y2="162" stroke-width="1" stroke-linecap="round"/>
      <line x1="107" y1="109" x2="106" y2="145" stroke-width="1" stroke-linecap="round"/>
      <line x1="121" y1="110" x2="122" y2="164" stroke-width="1" stroke-linecap="round"/>
      <line x1="136" y1="110" x2="137" y2="137" stroke-width="1" stroke-linecap="round"/>
      <line x1="145" y1="106" x2="143" y2="166" stroke-width="1" stroke-linecap="round"/>
      <line x1="151" y1="108" x2="152" y2="158" stroke-width="1" stroke-linecap="round"/>
      <line x1="162" y1="108" x2="161" y2="147" stroke-width="1" stroke-linecap="round"/>
      <line x1="173" y1="109" x2="174" y2="131" stroke-width="1" stroke-linecap="round"/>
      <line x1="179" y1="108" x2="178" y2="153" stroke-width="1" stroke-linecap="round"/>
      <line x1="192" y1="109" x2="193" y2="149" stroke-width="1" stroke-linecap="round"/>
      <line x1="201" y1="109" x2="200" y2="137" stroke-width="1" stroke-linecap="round"/>
      <line x1="215" y1="107" x2="214" y2="143" stroke-width="1" stroke-linecap="round"/>
      <line x1="229" y1="101" x2="229" y2="120" stroke-width="1" stroke-linecap="round"/>
      <line x1="243" y1="102" x2="243" y2="145" stroke-width="1" stroke-linecap="round"/>
      <line x1="257" y1="103" x2="256" y2="135" stroke-width="1" stroke-linecap="round"/>
      <line x1="270" y1="102" x2="268" y2="115" stroke-width="1" stroke-linecap="round"/>
      <line x1="80" y1="104" x2="79" y2="192" stroke-width="3" stroke-linecap="round"/>
      <line x1="208" y1="104" x2="207" y2="192" stroke-width="3" stroke-linecap="round"/>
      </g>
      <path d="M38,194 C92,190 122,191 150,191 C188,191 216,190 262,194" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" opacity="0.8"/>
      </g>

    </svg>
  );
}
