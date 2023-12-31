/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import type * as THREE from "three";
import { type GLTF } from "three-stdlib";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

type GLTFResult = GLTF & {
  nodes: {
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Wolf3D_Head: THREE.SkinnedMesh;
    Wolf3D_Teeth: THREE.SkinnedMesh;
    Wolf3D_Body: THREE.SkinnedMesh;
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top: THREE.SkinnedMesh;
    Wolf3D_Hair: THREE.SkinnedMesh;
    Wolf3D_Glasses: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    Wolf3D_Eye: THREE.MeshStandardMaterial;
    Wolf3D_Skin: THREE.MeshStandardMaterial;
    Wolf3D_Teeth: THREE.MeshStandardMaterial;
    Wolf3D_Body: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
    Wolf3D_Hair: THREE.MeshStandardMaterial;
    Wolf3D_Glasses: THREE.MeshStandardMaterial;
  };
};

// interface props {
//   position?: [number, number, number];
//   scale?: number;
// }

export function Avatar({ audioSpeech, text, lipsync, position, scale }: any) {
  // const audioBlob = new Blob([audioSpeech], { type: "audio/mpeg" });
  // const blobUrl = URL.createObjectURL(audioBlob);

  const corresponding = {
    A: "viseme_PP",
    B: "viseme_kk",
    C: "viseme_I",
    D: "viseme_AA",
    E: "viseme_O",
    F: "viseme_U",
    G: "viseme_FF",
    H: "viseme_TH",
    X: "viseme_PP",
  };
  const { nodes, materials } = useGLTF("/assets/avatar.glb") as GLTFResult;

  const { animations: Idle } = useFBX("/assets/animations/Idle.fbx");
  const { animations: Talking } = useFBX("/assets/animations/Talking.fbx");
  const { animations: Greeting } = useFBX("/assets/animations/Greeting.fbx");

  Idle[0].name = "Idle";
  Greeting[0].name = "Greeting";
  Talking[0].name = "Talking";

  const [animation, setAnimation] = useState("Idle");

  const group = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  const { actions } = useAnimations([Idle[0], Greeting[0], Talking[0]], group);
  console.log("action is\n",actions);
  
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //   actions?.[animations].reset().fadeIn(0.5).play();
  //   return () => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //     actions?.[animations]?.fadeOut(0.5);
  //   };
  // }, [animations]);

  // useEffect(() => {
  //   if(actions) {
  //     actions["idle"]?.play()
  //   }
  // }, [actions]);

  // useEffect(() => {
  //   if (!actions[animation]) return;
  //   actions[animation].reset().fadeIn(0.5).play();
  //   return () => actions[animation]?.fadeOut(0.5);
  // }, [animation]);

  //copy
  // useEffect(() => {
  //   console.log(nodes.Wolf3D_Head.morphTargetDictionary);
  // }, [nodes]);

  // const [playAudio, setPlayAudio] = useState(false);
  // useEffect(() => {
  //   if (audioSpeech && audioSpeech.ended) {
  //     setPlayAudio(true);
  //   } else {
  //     setPlayAudio(false);
  //   }
  // }, [audioSpeech]);
  // const { script, headFollow, smoothMorphTarget, morphTargetSmoothing } = {
  //   playAudio: true,
  //   headFollow: true,
  //   smoothMorphTarget: true,
  //   morphTargetSmoothing: 0.5,
  //   script: {
  //     value: "Talking",
  //     options: ["Talking", "Idle", "Greeting"],
  //   },
  // };
  // console.log(props.currentMessage);
  // const audio = audioSpeech;
  // useFrame(() => {
  //   if (!audio || !lipsync) {
  //     setAnimation("Idle");
  //     console.log("Idle animation");
  //     return;
  //   }
  //   const currentAudioTime = audio.currentTime;
  //   if (audio.paused || audio.ended) {
  //     setAnimation("Idle");
  //     console.log("Idle animation");
  //     return;
  //   }

  //   Object.values(corresponding).forEach((value) => {
  //     if (!smoothMorphTarget) {
  //       nodes.Wolf3D_Head.morphTargetInfluences[
  //         nodes.Wolf3D_Head.morphTargetDictionary[value]
  //       ] = 0;
  //       nodes.Wolf3D_Teeth.morphTargetInfluences[
  //         nodes.Wolf3D_Teeth.morphTargetDictionary[value]
  //       ] = 0;
  //     } else {
  //       nodes.Wolf3D_Head.morphTargetInfluences[
  //         nodes.Wolf3D_Head.morphTargetDictionary[value]
  //       ] = THREE.MathUtils.lerp(
  //         nodes.Wolf3D_Head.morphTargetInfluences[
  //           nodes.Wolf3D_Head.morphTargetDictionary[value]
  //         ],
  //         0,
  //         morphTargetSmoothing,
  //       );

  //       nodes.Wolf3D_Teeth.morphTargetInfluences[
  //         nodes.Wolf3D_Teeth.morphTargetDictionary[value]
  //       ] = THREE.MathUtils.lerp(
  //         nodes.Wolf3D_Teeth.morphTargetInfluences[
  //           nodes.Wolf3D_Teeth.morphTargetDictionary[value]
  //         ],
  //         0,
  //         morphTargetSmoothing,
  //       );
  //     }
  //   });

  //   for (let i = 0; i < lipsync.mouthCues.length; i++) {
  //     const mouthCue = lipsync.mouthCues[i];
  //     if (
  //       currentAudioTime >= mouthCue.start &&
  //       currentAudioTime <= mouthCue.end
  //     ) {
  //       if (!smoothMorphTarget) {
  //         nodes.Wolf3D_Head.morphTargetInfluences[
  //           nodes.Wolf3D_Head.morphTargetDictionary[
  //             corresponding[mouthCue.value]
  //           ]
  //         ] = 1;
  //         nodes.Wolf3D_Teeth.morphTargetInfluences[
  //           nodes.Wolf3D_Teeth.morphTargetDictionary[
  //             corresponding[mouthCue.value]
  //           ]
  //         ] = 1;
  //       } else {
  //         nodes.Wolf3D_Head.morphTargetInfluences[
  //           nodes.Wolf3D_Head.morphTargetDictionary[
  //             corresponding[mouthCue.value]
  //           ]
  //         ] = THREE.MathUtils.lerp(
  //           nodes.Wolf3D_Head.morphTargetInfluences[
  //             nodes.Wolf3D_Head.morphTargetDictionary[
  //               corresponding[mouthCue.value]
  //             ]
  //           ],
  //           1,
  //           morphTargetSmoothing,
  //         );
  //         nodes.Wolf3D_Teeth.morphTargetInfluences[
  //           nodes.Wolf3D_Teeth.morphTargetDictionary[
  //             corresponding[mouthCue.value]
  //           ]
  //         ] = THREE.MathUtils.lerp(
  //           nodes.Wolf3D_Teeth.morphTargetInfluences[
  //             nodes.Wolf3D_Teeth.morphTargetDictionary[
  //               corresponding[mouthCue.value]
  //             ]
  //           ],
  //           1,
  //           morphTargetSmoothing,
  //         );
  //       }

  //       break;
  //     }
  //   }
  // });

  // useEffect(() => {
  //   nodes.Wolf3D_Head.morphTargetInfluences[
  //     nodes.Wolf3D_Head.morphTargetDictionary["viseme_I"]
  //   ] = 1;
  //   nodes.Wolf3D_Teeth.morphTargetInfluences[
  //     nodes.Wolf3D_Teeth.morphTargetDictionary["viseme_I"]
  //   ] = 1;
  //   if (audio) {
  //     audio.play();
  //     if (script === "welcome") {
  //       setAnimation("Greeting");
  //     } else {
  //       setAnimation("Speech");
  //     }
  //   } else {
  //     setAnimation("Idle");
  //     if (audio) {
  //       audio.pause();
  //     }
  //   }
  // }, [playAudio, script]);

  // useFrame((state) => {
  //   if (headFollow) {
  //     group.current.getObjectByName("Head").lookAt(state.camera.position);
  //   }
  // });

  return (
    <group position={position} scale={scale} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/assets/avatar.glb");
