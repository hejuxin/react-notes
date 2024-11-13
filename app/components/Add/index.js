'use client'
import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react';
import SidebarImport from './Import';
import MenuItem from './MenuItem';
import './style.css'
import Link from 'next/link';

const hideclass = 'popover-hidden'
export default function Add() {
  const popoverRef = useRef(null);
  const btnRef = useRef(null);
  const timerRef = useRef(null);

  const onMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect()
    popoverRef.current.classList.remove(hideclass);
    popoverRef.current.style.left = `${rect.x}px`;
    popoverRef.current.style.top = `${rect.y + rect.height}px`;
  }

  const onMousePopoverEnter = (e) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    e.target.classList.remove(hideclass);
  }

  const onMousePopoverLeave = (e) => {
    e.target.classList.add(hideclass);
  }

  const onMouseLeave = (e) => {
    if (popoverRef.current) {
      timerRef.current = setTimeout(() => {
        popoverRef.current.classList.add(hideclass);
      }, 0);
      popoverRef.current.addEventListener('mouseenter', onMousePopoverEnter);
      popoverRef.current.addEventListener('mouseleave', onMousePopoverLeave);
    }
  }

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.addEventListener('mouseenter', onMouseEnter);
      btnRef.current.addEventListener('mouseleave', onMouseLeave);
    }


    return () => {
      if (btnRef.current) {
        btnRef.current.removeEventListener('mouseenter', onMouseEnter);
        btnRef.current.removeEventListener('mouseleave', onMouseLeave);
      }

    }
  }, [])

  return (
    <>
      <div className="btn-add" ref={btnRef}>
        <img
          src="/add.svg"
          width="16px"
          height="16px"
          alt="Collapse"
        />
      </div>
      {/* {
        createPortal( */}
          <div>
            <div className={`popover ${hideclass}`} ref={popoverRef} >
              <div className='popover-content'>
                <ul>
                  <li>
                    <MenuItem src="/doc.svg">
                      <Link
                        href={{
                          pathname: `/note/edit/`,
                        }}
                        className="link--unstyled"
                      >
                        文档
                      </Link>
                    </MenuItem>
                  </li>
                  <li>
                    <MenuItem src="/import.svg">
                      <SidebarImport />
                    </MenuItem>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* , document.body)
      } */}
    </>
  )
}