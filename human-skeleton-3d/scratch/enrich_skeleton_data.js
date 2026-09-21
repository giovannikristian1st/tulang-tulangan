const fs = require('fs');
const path = require('path');

const translations = {
  frontale: {
    nameEn: "Frontal Bone (Forehead)",
    nameZh: "额骨 (前额骨)",
    descEn: "Thick flat bone forming the human forehead and the upper roof of the eye sockets (orbits). Protects the brain's frontal lobe which governs reasoning, focus, and voluntary movement.",
    descZh: "形成人类前额及眼眶顶壁的扁平厚骨。保护大脑额叶，额叶主要负责逻辑思维、注意力和自主运动控制。",
    funFactEn: "In infancy, the frontal bone is split into two halves separated by the frontal suture, fusing completely around age two.",
    funFactZh: "婴儿时期，额骨由额缝分为左右两半，通常在两岁左右完全融合为一块完整的骨骼。"
  },
  parietale: {
    nameEn: "Parietal Bones (Pair)",
    nameZh: "顶骨 (成对)",
    descEn: "A pair of broad curved bones forming the cranial roof and lateral walls. Protects the parietal lobes responsible for processing sensory perception such as touch, pain, and temperature.",
    descZh: "构成颅腔顶壁与侧壁的一对弧形扁骨。保护大脑顶叶，顶叶主要负责处理触觉、痛觉和温度等感觉信息。",
    funFactEn: "The junction between both parietal bones forms the soft anterior fontanelle that gently pulses in newborn babies.",
    funFactZh: "两块顶骨在头顶正中的交接处构成了新生儿的前囟门，呈现轻微柔软的脉动。"
  },
  temporale: {
    nameEn: "Temporal Bones (Pair)",
    nameZh: "颞骨 (成对)",
    descEn: "A pair of bones on the lower lateral sides of the skull near the ear canals. Houses the hearing and vestibular balance organs, and anchors the jaw joint.",
    descZh: "位于头颅两侧下方、耳道周围的一对不规则骨。容纳听觉与平衡感受器官，并形成下颌关节的窝臼。",
    funFactEn: "The petrous part of the temporal bone is among the densest, hardest bony structures in the entire human body!",
    funFactZh: "颞骨的岩部是整个人体中骨质密度最高、最坚硬的骨骼结构之一！"
  },
  occipitale: {
    nameEn: "Occipital Bone (Base of Skull)",
    nameZh: "枕骨 (后颅底骨)",
    descEn: "Bowl-shaped bone at the base and back of the cranium. Features the foramen magnum through which the brainstem connects with the spinal cord.",
    descZh: "位于头颅后下部的弧形扁骨。中央有巨大的枕骨大孔，脑干经由此孔与脊髓相连。",
    funFactEn: "Possesses two condyles on its underside that articulate with the first cervical vertebra (Atlas), allowing head nodding gestures.",
    funFactZh: "底部的两个枕髁与第一颈椎（寰椎）形成关节，使我们能够自如地上下点头。"
  },
  sphenoidale: {
    nameEn: "Sphenoid Bone (Keystone of Cranium)",
    nameZh: "蝶骨 (颅底中央楔石骨)",
    descEn: "A butterfly-shaped bone stretching across the middle cranial base. Acts as the central keystone articulating with nearly all cranial bones.",
    descZh: "形似展翅蝴蝶、横贯颅底中部的核心骨骼。作为中央楔石骨，与几乎所有颅骨相接并锁紧颅底。",
    funFactEn: "Houses the 'Sella Turcica' (Turkish Saddle), a saddle-shaped depression cradling the pituitary gland, the master gland of human hormones.",
    funFactZh: "其中央有被称为“蝶鞍”的鞍状凹窝，安放并保护着掌控人体全部激素的主脑——垂体腺。"
  },
  ethmoidale: {
    nameEn: "Ethmoid Bone (Nasal-Cranial Sieve)",
    nameZh: "筛骨 (鼻颅筛板骨)",
    descEn: "A lightweight, sponge-like porous bone located between both eye sockets and the roof of the nasal cavity. Separates the nasal cavity from the cranial fossa.",
    descZh: "位于两眼眶之间、鼻腔顶部的海绵状轻质含气骨。将鼻腔与大脑前颅窝直接分隔开。",
    funFactEn: "Its cribriform plate contains dozens of tiny perforations through which olfactory nerve fibers travel directly into the brain for smell.",
    funFactZh: "筛板布满数十个微孔，嗅觉神经纤维正是穿过这些微孔由鼻腔直达大脑嗅球感知气味。"
  },
  maxilla: {
    nameEn: "Maxillae / Upper Jaw (Pair)",
    nameZh: "上颌骨 (成对)",
    descEn: "A fused pair of facial bones forming the upper jaw, orbital floor, and nasal walls. Houses the upper dentition.",
    descZh: "在面部中央愈合的一对主要面骨，构成上颌、眼眶底和鼻腔外侧壁，容纳上部恒齿牙槽。",
    funFactEn: "Contains the maxillary sinuses, the largest air cavities in the human skull that enrich vocal resonance when speaking.",
    funFactZh: "上颌骨体内含有上颌窦，是人体颅骨中最大的含气空腔，能为言语发音提供丰富的共鸣。"
  },
  zygomaticum: {
    nameEn: "Zygomatic Bones / Cheekbones (Pair)",
    nameZh: "颧骨 (成对)",
    descEn: "A pair of diamond-shaped bones prominent beneath the eyes, shaping cheek contours and the zygomatic arches on the lateral face.",
    descZh: "位于眼眶下方、呈菱形隆起的一对骨骼，决定面颊轮廓并形成面侧部的颧弓。",
    funFactEn: "The zygomatic arch anchors the masseter muscle, pound-for-pound the strongest mastication muscle in the human body.",
    funFactZh: "颧弓是咀嚼肌——咬肌的重要附着点，按相对体积计算，咬肌是人体收缩力量最强的肌肉之一。"
  },
  nasale: {
    nameEn: "Nasal Bones (Bridge of Nose, Pair)",
    nameZh: "鼻骨 (鼻梁骨，成对)",
    descEn: "A pair of small, thin oblong bones meeting at the midline to form the bridge of the nose.",
    descZh: "位于面部中央上方的一对薄长方形小骨，在中线相接形成硬质鼻梁骨架。",
    funFactEn: "The nasal bones only form the upper third of the nose; the flexible lower two-thirds are made purely of cartilage.",
    funFactZh: "鼻骨仅构成鼻梁的上三分之一，而下部富有弹性的鼻头与鼻翼则完全由软骨构成。"
  },
  mandibula: {
    nameEn: "Mandible / Lower Jaw",
    nameZh: "下颌骨 (下巴骨)",
    descEn: "The largest and strongest bone of the human face. It is the only freely mobile skull bone, enabling chewing and speech.",
    descZh: "人体面部最大、最坚固的骨骼，也是整个颅骨中唯一能够自由活动的骨骼，负责咀嚼与言语运动。",
    funFactEn: "The temporomandibular joint (TMJ) connecting the mandible to the skull moves thousands of times daily during swallowing, speaking, and eating.",
    funFactZh: "连接下颌骨与颅骨的颞下颌关节（TMJ）每天随着吞咽、说话和咀嚼活动运动数千次。"
  },
  lacrimale: {
    nameEn: "Lacrimal Bones (Tear Bones, Pair)",
    nameZh: "泪骨 (成对)",
    descEn: "The smallest and most fragile bones of the face, situated at the anterior medial wall of the eye orbits. Forms the nasolacrimal canal for tears.",
    descZh: "面部最小、最脆弱的一对小骨，位于眼眶内侧壁前部。参与构成泪道，引导眼泪流向鼻腔。",
    funFactEn: "This explains why our noses run whenever we cry, as excess tears drain straight into the nasal cavity!",
    funFactZh: "这也是为什么当我们痛哭流涕时，大量泪液会顺着泪管流入鼻腔导致鼻涕增多！"
  },
  palatinum: {
    nameEn: "Palatine Bones (Hard Palate, Pair)",
    nameZh: "腭骨 (硬腭骨，成对)",
    descEn: "A pair of L-shaped bones at the back of the oral and nasal cavities. Forms the posterior third of the hard palate and floor of the nasal cavity.",
    descZh: "位于口腔和鼻腔后部的一对呈“L”形的小骨。构成硬腭后三分之一及鼻腔底壁。",
    funFactEn: "Separates the oral cavity from the nasal airways, allowing humans to breathe while chewing food.",
    funFactZh: "严密分隔口腔与鼻腔通道，使人类在咀嚼食物的同时能够保持呼吸顺畅。"
  },
  concha_nasalis_inferior: {
    nameEn: "Inferior Nasal Conchae (Turbinates, Pair)",
    nameZh: "下鼻甲骨 (成对)",
    descEn: "A pair of scrolled, shell-shaped bony plates extending horizontally along the lateral nasal walls. Creates turbulent airflow.",
    descZh: "附着于鼻腔外侧壁的一对卷曲贝壳状薄骨。使吸入的气流形成涡流。",
    funFactEn: "Lined with rich vascular tissue that warms, humidifies, and filters incoming air before it reaches the lungs.",
    funFactZh: "表面覆有丰富的血管粘膜网络，能够在吸入的空气进入肺部前对其进行加温、加湿与高效过滤。"
  },
  vomer: {
    nameEn: "Vomer (Nasal Septum Bone)",
    nameZh: "犁骨 (鼻中隔骨)",
    descEn: "A thin plowshare-shaped bone situated vertically along the nasal midsagittal plane. Forms the posteroinferior nasal septum.",
    descZh: "位于鼻腔正中垂直面、呈犁铧形的薄扁骨。构成鼻中隔的后下部骨性屏障。",
    funFactEn: "Its name derives from the Latin word 'Vomer' meaning a farmer's plowshare, describing its distinct geometric shape.",
    funFactZh: "其名称源于拉丁语“Vomer”，意为古代农耕犁铧，形象地描述了其特殊的扁平几何外形。"
  },
  ossicula_auditus: {
    nameEn: "Auditory Ossicles: Malleus, Incus, Stapes (6 Bones)",
    nameZh: "听小骨：锤骨、砧骨、镫骨 (6块)",
    descEn: "Three pairs of miniature bones in the middle ear: Malleus, Incus, and Stapes. Transmits and amplifies sound vibrations from eardrum to cochlea.",
    descZh: "位于中耳鼓室内的三对极微小骨骼：锤骨、砧骨和镫骨。将耳膜的声波机械震动高效放大并传导至内耳耳蜗。",
    funFactEn: "The stapes is the smallest and lightest bone in the human body, measuring barely 3 mm and weighing just 3 milligrams!",
    funFactZh: "镫骨（Stapes）是整个人体中最微小、最轻盈的骨骼，长度仅约3毫米，重量只有3毫克左右！"
  },
  hyoideum: {
    nameEn: "Hyoid Bone (Tongue Bone)",
    nameZh: "舌骨",
    descEn: "A U-shaped bone in the anterior neck below the mandible. Suspends the tongue base and larynx, vital for swallowing and speech.",
    descZh: "位于颈前部下颌下方、呈马蹄铁形的独立骨骼。悬吊并支撑舌根和喉头软骨，对于吞咽和发音至关重要。",
    funFactEn: "The hyoid is the only bone in the entire human skeleton that does not articulate directly with any other bone!",
    funFactZh: "舌骨是整个人体骨骼系统中唯一一块不与任何其他骨骼直接形成关节相连的骨头（仅由肌腱和韧带悬吊浮于颈中）！"
  },
  vertebrae_cervicales: {
    nameEn: "Cervical Vertebrae (C1 - C7, Neck)",
    nameZh: "颈椎 (C1 - C7，颈部椎骨)",
    descEn: "The seven vertebrae of the neck. C1 (Atlas) supports the globe of the head while C2 (Axis) enables rotational side-to-side movement.",
    descZh: "构成颈部的七块椎骨。第一颈椎（寰椎）承托头部，第二颈椎（枢椎）提供枢轴旋转，支持头部的屈伸与转动。",
    funFactEn: "Almost all mammals on Earth, from humans to long-necked giraffes, share exactly 7 cervical vertebrae!",
    funFactZh: "地球上几乎所有哺乳动物，从人类到脖子长达两米的长颈鹿，都恰好拥有完全相同的7块颈椎！"
  },
  vertebrae_thoracicae: {
    nameEn: "Thoracic Vertebrae (T1 - T12, Mid-Back)",
    nameZh: "胸椎 (T1 - T12，胸段椎骨)",
    descEn: "Twelve mid-back vertebrae. Each features costal facets articulating with 12 pairs of ribs, anchoring the protective ribcage.",
    descZh: "构成背部中段的十二块椎骨。每块胸椎均具有特殊的肋凹关节面，与十二对肋骨相连构成坚固的胸廓后壁。",
    funFactEn: "Intervertebral discs compress under gravity during daytime, making you up to 1-2 cm shorter at night than in the morning!",
    funFactZh: "白天受重力影响，椎间盘的水分被轻微挤压压缩，导致晚上测得的身高通常比清晨矮1到2厘米！"
  },
  vertebrae_lumbales: {
    nameEn: "Lumbar Vertebrae (L1 - L5, Lower Back)",
    nameZh: "腰椎 (L1 - L5，腰段椎骨)",
    descEn: "The five largest, thickest spinal vertebrae. Bears the entire weight of the upper torso and enables bending, twisting, and lifting.",
    descZh: "五块体型最大、骨质最厚重的脊椎骨。承担上半身的全部重力负载，并支持腰部的屈曲、伸展与旋转。",
    funFactEn: "The L5 vertebra withstands the greatest mechanical stress in the spine and is the most common site of lumbar disc herniation.",
    funFactZh: "第五腰椎（L5）承受着全脊柱最大的机械杠杆压力，也是腰椎间盘突出症最常发病的节段。"
  },
  sacrum: {
    nameEn: "Sacrum (Fused Sacral Vertebrae)",
    nameZh: "骶骨 (5块骶椎融合骨)",
    descEn: "A triangular bone at the spinal base formed by the fusion of 5 sacral vertebrae. Couples the spine to the pelvis via sacroiliac joints.",
    descZh: "位于脊柱底部的倒三角形坚实大骨，由5块骶椎融合而成。通过骶髂关节将脊柱坚固地锚定在骨盆上。",
    funFactEn: "Named from the Latin 'Os Sacrum' meaning 'Holy Bone', reflecting ancient beliefs that it harbored the immortal human soul.",
    funFactZh: "名称源于拉丁语“Os Sacrum”（神圣之骨），古罗马人认为这块坚固的骨骼承载着人灵魂不灭的核心。"
  },
  coccyx: {
    nameEn: "Coccyx / Tailbone",
    nameZh: "尾骨 (尾椎融合骨)",
    descEn: "The terminal spinal tip formed by fusion of 3 to 5 rudimentary vertebrae. Anchors pelvic floor muscles supporting visceral organs.",
    descZh: "脊柱的最下端，由3至5块退化的尾椎愈合而成。为盆底肌群提供关键的锚定附着点，支撑盆腔内脏器。",
    funFactEn: "The coccyx acts as the third leg of a sitting tripod, absorbing and distributing weight when you lean back while seated.",
    funFactZh: "当我们后倾坐下时，尾骨与两侧坐骨结节共同构成三脚架支撑平衡，分担上半身重力。"
  },
  sternum: {
    nameEn: "Sternum / Breastbone",
    nameZh: "胸骨 (胸前正中扁骨)",
    descEn: "A flat elongated necktie-shaped bone centered on the anterior chest. Shields the heart and aorta directly beneath it.",
    descZh: "位于胸前部正中、形似领带的长条扁骨。为后方深处的跳动心脏及主动脉弓提供第一道坚固防线。",
    funFactEn: "Composed of three fused sections: the manubrium, the body, and the pointed xiphoid process at the bottom.",
    funFactZh: "由上至下分为三部分：胸骨柄、胸骨体和最下端的剑突。"
  },
  costae_verae: {
    nameEn: "True Ribs (Pairs 1 - 7, 14 Bones)",
    nameZh: "真肋 (第1 - 7对，14根)",
    descEn: "The first 7 pairs of ribs (14 bones) attached directly to the sternum via their individual costal cartilages. Encages heart and lungs.",
    descZh: "人体最上部的7对肋骨（共14根），每根均通过自身独立的肋软骨直接与胸骨相连。保护心肺器官。",
    funFactEn: "The spring-like elasticity of costal cartilages allows the ribcage to expand outward by several centimeters during deep inhalation.",
    funFactZh: "肋软骨优异的生物弹性使胸廓在深吸气时能向外扩张数厘米，实现顺畅的胸式呼吸。"
  },
  costae_spuriae: {
    nameEn: "False Ribs (Pairs 8 - 10, 6 Bones)",
    nameZh: "假肋 (第8 - 10对，6根)",
    descEn: "Three rib pairs (6 bones) that do not reach the sternum directly; their cartilages join that of the 7th rib above.",
    descZh: "第8至第10对肋骨（共6根），其前端软骨不直接连接胸骨，而是相互顺延连合于第7肋软骨上。",
    funFactEn: "Called 'false' not because they aren't genuine bones, but because their anterior attachment to the breastbone is indirect!",
    funFactZh: "称其为“假肋”并非非真骨，而是指其前端未直接固定于胸骨体上！"
  },
  costae_fluctuantes: {
    nameEn: "Floating Ribs (Pairs 11 - 12, 4 Bones)",
    nameZh: "浮肋 (第11 - 12对，4根)",
    descEn: "The bottom two rib pairs (4 bones) attached only to the spine, with anterior tips ending freely within the abdominal wall muscles.",
    descZh: "最下部的2对肋骨（共4根），仅后端固定于胸椎，前端完全游离于腹壁肌肉层中。",
    funFactEn: "Their unattached anterior tips grant abdominal flexibility while shielding both kidneys against posterior physical trauma.",
    funFactZh: "前端游离状态赋予腹部扭转极佳的柔韧度，同时为后腰深处的双肾提供护盾。"
  },
  clavicula: {
    nameEn: "Clavicles / Collarbones (Pair)",
    nameZh: "锁骨 (成对)",
    descEn: "A pair of S-shaped horizontal strut bones across the upper chest. Holds the shoulder joints out laterally for free arm mobility.",
    descZh: "横贯于前胸上部的一对呈“S”形弯曲长骨。如同支撑架般将上肢与胸廓拉开距离，使手臂能大幅度自由摆动。",
    funFactEn: "The clavicle is the very first bone to begin ossifying in a fetus, and one of the most frequently fractured bones in sports.",
    funFactZh: "锁骨是胎儿发育过程中最早开始骨化坚硬的骨骼，也是运动损伤中发生骨折几率最高的人体骨骼之一。"
  },
  scapula: {
    nameEn: "Scapulae / Shoulder Blades (Pair)",
    nameZh: "肩胛骨 (成对)",
    descEn: "A pair of flat triangular blades on the upper posterior back. Forms the highly mobile glenohumeral ball-and-socket shoulder joint.",
    descZh: "贴附于背部上方两侧的一对宽扁倒三角形骨骼。其外侧的盂臼与肱骨头构成人体活动度最大的肩关节。",
    funFactEn: "The shoulder blade floats over muscles without a direct bony joint to the ribs, enabling expansive shoulder rotational reach!",
    funFactZh: "肩胛骨并不与胸廓形成骨性关节，而是悬浮滑行于背部肌肉床之上，赋予手臂极广阔的三维活动空间！"
  },
  humerus: {
    nameEn: "Humerus / Upper Arm Bones (Pair)",
    nameZh: "肱骨 (上臂骨，成对)",
    descEn: "The longest, largest bone of the upper limb. Connects the shoulder socket to the elbow hinge, powering lifting and throwing.",
    descZh: "上肢最长、最粗壮的管状长骨。连接肩关节与肘关节，为推举、投掷等上肢动作提供坚实杠杆支持。",
    funFactEn: "The stinging sensation when hitting your 'funny bone' occurs where the ulnar nerve passes over the medial epicondyle of the humerus.",
    funFactZh: "手肘内侧不慎碰撞时产生的麻木触电感（俗称麻筋），是因尺神经从肱骨内上髁浅表沟槽穿过受到挤压所致。"
  },
  radius: {
    nameEn: "Radius / Forearm Lateral Bones (Pair)",
    nameZh: "桡骨 (前臂外侧骨，成对)",
    descEn: "The lateral forearm bone aligned with the thumb. Rotates around the ulna to allow hand pronation and supination.",
    descZh: "位于前臂外侧、与大拇指同侧的长骨。能够围绕内侧尺骨旋转交叉，使手掌能够自由翻转（旋前与旋后）。",
    funFactEn: "The radial pulse routinely checked by doctors to measure heart rate rests directly against the distal end of the radius.",
    funFactZh: "医生诊脉时常测的桡动脉搏动，正是紧贴桡骨下端浅表处跳动的。"
  },
  ulna: {
    nameEn: "Ulna / Forearm Medial Bones (Pair)",
    nameZh: "尺骨 (前臂内侧骨，成对)",
    descEn: "The medial forearm bone aligned with the pinky finger. Features the hook-like olecranon forming the bony elbow point.",
    descZh: "位于前臂内侧、与小指同侧的长骨。上端粗大的鹰嘴突构成手肘突出的骨性标志。",
    funFactEn: "The olecranon locks into the humeral fossa upon full arm extension, structurally preventing the elbow from hyperextending backward.",
    funFactZh: "当手臂完全伸直时，尺骨鹰嘴恰好嵌入肱骨鹰嘴窝中，在结构上锁定防止手肘向后过度反折。"
  },
  ossa_carpi: {
    nameEn: "Carpal Bones / Wrist (16 Bones)",
    nameZh: "腕骨 (手腕骨，16块)",
    descEn: "Eight pebble-like bones in each wrist (16 total) arranged in two rows. Provides multidirectional wrist dexterity.",
    descZh: "分布于两手腕部的八对（共16块）卵石状短骨，排成近侧与远侧两列。赋予手腕复杂多轴的微屈伸旋转能力。",
    funFactEn: "These bones form the bony floor of the Carpal Tunnel; nerve compression within this tight space causes Carpal Tunnel Syndrome.",
    funFactZh: "腕骨沟与腕横韧带共同围成著名的“腕管”，正中神经若在此狭窄通道受压便会引发腕管综合征（鼠标手）。"
  },
  ossa_metacarpi: {
    nameEn: "Metacarpal Bones / Palm (10 Bones)",
    nameZh: "掌骨 (手掌骨，10块)",
    descEn: "Ten miniature long bones (5 per hand) forming the structural framework of the palm, bridging wrist to fingers.",
    descZh: "构成手掌内部骨架的十块（每侧5块）微型管状骨，连接腕骨与指骨。",
    funFactEn: "The distinct knuckles visible when clenching a fist are actually the distal heads of your metacarpal bones.",
    funFactZh: "握拳时手背凸起的指关节棱角（拳峰），实际上是掌骨远端的膨大骨头。"
  },
  phalanges_manus: {
    nameEn: "Phalanges of Hand / Finger Bones (28 Bones)",
    nameZh: "手指骨 / 手部指骨 (28块)",
    descEn: "Twenty-eight finger bones (14 per hand). Each finger contains 3 phalanges, whereas the opposable thumb contains only 2.",
    descZh: "构成双手十指的二十八块指骨（每手14块）。除大拇指仅有2节外，其余四指均由近节、中节和远节3块指骨组成。",
    funFactEn: "The two-phalanx opposable human thumb can touch every other fingertip, an evolutionary trait enabling precision tool handling!",
    funFactZh: "仅有两节指骨的人类拇指具有无与伦比的对掌运动能力，可对触其余四指指腹，是人类制造与使用工具的演化关键！"
  },
  os_coxae: {
    nameEn: "Hip Bones / Pelvic Coxal Bones (Pair)",
    nameZh: "髋骨 (骨盆髋骨，成对)",
    descEn: "A pair of large hip bones formed by the fusion of Ilium, Ischium, and Pubis. Supports abdominal weight and connects legs to trunk.",
    descZh: "由髂骨、坐骨和耻骨在青春期后完全融合而成的一对大型不规则骨。承托腹盆腔脏器，并将下肢与躯干相连。",
    funFactEn: "The deep acetabular cup serves as the hip socket, locking the femur head with immense structural stability.",
    funFactZh: "髋骨外侧深陷的髋臼是人体最深、最稳固的杵臼关节窝，紧密扣合股骨头以承受全身重量。"
  },
  femur: {
    nameEn: "Femur / Thigh Bones (Pair)",
    nameZh: "股骨 (大腿骨，成对)",
    descEn: "The longest, heaviest, and strongest bone in the human body. Capable of supporting tons of vertical compressive force during running.",
    descZh: "整个人体中最长、最粗壮、最结实的骨骼。在跑步或跳跃落地时能承受数千公斤的垂直压应力。",
    funFactEn: "An adult femur accounts for roughly one-quarter (26-27%) of a person's total standing height!",
    funFactZh: "成年人的股骨长度约占人体总身高的四分之一（26-27%），法医学中常用其推算死者身前身高！"
  },
  patella: {
    nameEn: "Patellae / Kneecaps (Pair)",
    nameZh: "髌骨 (膝盖骨，成对)",
    descEn: "The largest sesamoid bone in the human body. Embedded in the quadriceps tendon, it dramatically boosts knee leverage.",
    descZh: "人体内最大的籽骨（包裹于肌腱内的骨骼）。位于膝关节前方股四头肌腱内，极大地增强了伸膝运动的力臂杠杆效应。",
    funFactEn: "Newborn babies are born without solid bony kneecaps; their patellas start as soft cartilage and only fully ossify around age 3 to 5.",
    funFactZh: "新生儿出生时其实没有坚硬的骨性膝盖骨，其髌骨原本为软骨，在3至5岁时才逐步完全骨化成真骨。"
  },
  tibia: {
    nameEn: "Tibia / Shin Bones (Pair)",
    nameZh: "胫骨 (小腿内侧主骨，成对)",
    descEn: "The large, thick medial bone of the lower leg. Carries about 90% of the body's weight transmitted through the knee down to the ankle.",
    descZh: "位于小腿内侧粗大结实的长骨。承受膝关节向下传递至脚踝的绝大部分（约90%）身体体重。",
    funFactEn: "The anterior crest of the tibia lies immediately beneath the skin without muscular padding, which is why shin kicks hurt intensely!",
    funFactZh: "胫骨前缘几乎仅由薄薄的皮肤覆盖而无肌肉缓冲垫层，因此小腿前侧受到轻微磕碰便会感到剧痛！"
  },
  fibula: {
    nameEn: "Fibula / Calf Bones (Pair)",
    nameZh: "腓骨 (小腿外侧骨，成对)",
    descEn: "The slender lateral bone of the lower leg. Stabilizes the ankle joint and serves as an attachment site for leg muscles.",
    descZh: "位于小腿外侧并与胫骨平行的细长骨。主要负责稳定踝关节外侧，并为小腿外侧肌肉群提供锚固附着面。",
    funFactEn: "The lower end of the fibula forms the prominent outer ankle bulge known medically as the lateral malleolus.",
    funFactZh: "腓骨的远端膨大部分形成了脚踝外侧清晰可触的骨性凸起，医学上称为外踝。"
  },
  ossa_tarsi: {
    nameEn: "Tarsal Bones / Ankle & Heel (14 Bones)",
    nameZh: "跗骨 (脚跟与踝部骨，14块)",
    descEn: "Seven robust bones in each ankle and midfoot (14 total), including the heel (calcaneus) and talus. Absorbs footfall shock.",
    descZh: "分布于两脚踝后部的十四块（每侧7块）强壮短骨，包括跟骨与距骨。负责吸收落地冲击力并协调踝部运动。",
    funFactEn: "The calcaneus (heel bone) is the single largest foot bone, capable of absorbing impact shocks many times body weight.",
    funFactZh: "跟骨（Calcaneus）是脚部最大的单块骨骼，能在跑步跳跃时吸收相当于体重数倍的垂直地面反作用力。"
  },
  ossa_metatarsi: {
    nameEn: "Metatarsal Bones / Midfoot Arch (10 Bones)",
    nameZh: "跖骨 (脚掌骨，10块)",
    descEn: "Ten miniature long bones (5 per foot) forming the longitudinal arches of the foot, elastically distributing weight when walking.",
    descZh: "构成脚掌内部骨架的十块（每侧5块）微型长骨，形成足弓以弹性分散步态重力。",
    funFactEn: "The elastic arches formed by metatarsals act like biological leaf springs, saving up to 17% of mechanical energy during walking.",
    funFactZh: "由跖骨构筑的足底弹性足弓如同生物减震弹簧，在长途行走时可为人体节省多达17%的机械能耗。"
  },
  phalanges_pedis: {
    nameEn: "Phalanges of Foot / Toe Bones (28 Bones)",
    nameZh: "趾骨 / 脚趾骨 (28块)",
    descEn: "Twenty-eight toe bones (14 per foot). Maintains balance while standing upright and provides the final forward push-off when striding.",
    descZh: "构成双足脚趾的二十八块趾骨（每侧14块）。维持直立站立时的三点受力平衡，并在向前迈步蹬地时提供推进力。",
    funFactEn: "The big toe bears up to twice your body weight during push-off phase and contains only 2 phalanges, just like the thumb.",
    funFactZh: "大脚趾在迈步蹬地时需承受高达体重两倍的推力，且它与大拇指一样仅由2节粗壮的趾骨构成。"
  }
};

const indexPath2 = path.join(__dirname, '..', 'index.html');
let htmlContent = fs.readFileSync(indexPath2, 'utf8');

// Parse current skeletonData
const dataMatch = htmlContent.match(/const skeletonData = (\[[\s\S]*?\n    \];)/);
if (!dataMatch) {
  console.error('Could not find skeletonData array');
  process.exit(1);
}

const originalData = eval(dataMatch[1]);
const enrichedData = originalData.map(item => {
  const trans = translations[item.id] || {};
  return {
    id: item.id,
    nameId: item.nameId,
    nameEn: trans.nameEn || item.nameId,
    nameZh: trans.nameZh || item.nameId,
    nameLatin: item.nameLatin,
    group: item.group,
    regionId: item.regionId,
    count: item.count,
    nodeKeys: item.nodeKeys,
    cameraDist: item.cameraDist,
    descId: item.desc,
    descEn: trans.descEn || item.desc,
    descZh: trans.descZh || item.desc,
    funFactId: item.funFact,
    funFactEn: trans.funFactEn || item.funFact,
    funFactZh: trans.funFactZh || item.funFact
  };
});

const formattedSkeletonData = 'const skeletonData = ' + JSON.stringify(enrichedData, null, 2) + ';';
htmlContent = htmlContent.replace(dataMatch[0], formattedSkeletonData);

fs.writeFileSync(indexPath2, htmlContent, 'utf8');
console.log('Successfully enriched skeletonData with EN and ZH translations for all', enrichedData.length, 'bones!');
